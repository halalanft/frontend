/*
HalalanERC721Random

SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "./interfaces/IHalalanERC721Random.sol";
import "./HalalanERC721Fixed.sol";

/**
 * @title HalalanERC721Random
 *
 * @notice this extends the HalalanERC721Fixed contract and implements
 * randomized token distribution with a VRF callback and batch reveal pattern
 */
contract HalalanERC721Random is
    IHalalanERC721Random,
    HalalanERC721Fixed,
    VRFConsumerBase
{
    using Strings for uint256;

    struct VRFConfig {
        address coordinator;
        address link;
        bytes32 keyhash;
        uint256 fee;
    }

    // events
    event HiddenUpdated(string previous, string updated);
    event RevealableUpdated(bool previous, bool updated);
    event TokenReveal(
        address indexed user,
        bytes32 requestId,
        uint256[] tokens
    );

    // constants
    uint256 constant MAX_REVEAL = 16;

    // members
    string public hidden;
    uint256 public revealed;
    mapping(uint256 => uint256) public order;
    mapping(uint256 => uint256) public shuffle;
    bytes32 public immutable vrfKeyHash;
    uint256 public immutable vrfFee;
    uint256 public pending;
    uint256 public randomness;
    bool public revealable;

    /**
     * @param name_ token name
     * @param symbol_ token symbol
     * @param uri_ base token uri
     * @param max_ max token supply
     * @param price_ token mint price
     * @param batch_ max token mint batch size
     * @param vrf_ config struct for VRF
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        uint256 max_,
        uint256 price_,
        uint256 batch_,
        VRFConfig memory vrf_
    )
        HalalanERC721Fixed(name_, symbol_, uri_, max_, price_, batch_)
        VRFConsumerBase(vrf_.coordinator, vrf_.link)
    {
        hidden = "hidden";
        vrfKeyHash = vrf_.keyhash;
        vrfFee = vrf_.fee;
    }

    /**
     * @notice mint tokens as admin
     * @param amount number of tokens to mint
     */
    function mintOwner(uint256 amount)
        external
        override(IHalalanERC721, HalalanERC721)
        nonReentrant
    {
        require(
            msg.sender == owner(),
            "HalalanERC721Random: caller is not the owner contract"
        );
        require(
            amount <= batch,
            "HalalanERC721Random: exceeds max batch size"
        );
        require(
            total + amount <= max,
            "HalalanERC721Random: exceeds max token supply"
        );
        _update();
        for (uint256 i = 0; i < amount; i++) {
            total += 1;
            _mint(msg.sender, total);
        }
    }

    /**
     * @notice mint tokens with hidden metadata as standard public user
     * @param amount number of tokens to mint
     */
    function mint(uint256 amount)
        external
        payable
        override(IHalalanERC721, HalalanERC721Fixed)
        publicMintable
        nonReentrant
    {
        require(
            amount <= batch,
            "HalalanERC721Random: exceeds max batch size"
        );
        require(
            total + amount <= max,
            "HalalanERC721Random: exceeds max token supply"
        );
        require(
            msg.value == amount * price(),
            "HalalanERC721Random: invalid payment amount"
        );
        _update();
        for (uint256 i = 0; i < amount; i++) {
            total += 1;
            _mint(msg.sender, total);
        }
    }

    /**
     * @inheritdoc IHalalanERC721Random
     */
    function reveal(uint256[] calldata tokens) external returns (bytes32) {
        // validate
        require(revealable, "HalalanERC721Random: token reveal not enabled");
        require(tokens.length > 0, "HalalanERC721Random: token list is empty");
        require(
            tokens.length <= MAX_REVEAL,
            "HalalanERC721Random: exceeds reveal max"
        );
        _update();
        require(
            pending == 0,
            "HalalanERC721Random: reveal already in progress"
        );

        // stage tokens for reveal
        for (uint256 i = 0; i < tokens.length; i++) {
            require(
                _exists(tokens[i]),
                "HalalanERC721Random: token does not exist"
            );
            require(
                ownerOf(tokens[i]) == msg.sender,
                "HalalanERC721Random: caller does not own token"
            );
            require(
                order[tokens[i]] == 0,
                "HalalanERC721Random: token already revealed"
            );
            uint256 idx = revealed + i + 1; // index by 1
            order[tokens[i]] = idx;
            if (shuffle[idx] == 0) {
                shuffle[idx] = idx; // set initial value if not already swapped
            }
        }
        pending = tokens.length;

        // make randomness request to VRF
        require(
            LINK.balanceOf(address(this)) >= vrfFee,
            "HalalanERC721Random: insufficient LINK"
        );
        bytes32 requestId = requestRandomness(vrfKeyHash, vrfFee);
        emit TokenReveal(msg.sender, requestId, tokens);
        return requestId;
    }

    /**
     * @notice manually finalize pending operations
     */
    function update() external {
        _update();
    }

    /**
     * @notice get token URI based on reveal state of random token
     * @param tokenId token ID of interest
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "HalalanERC721Random: URI query for nonexistent token"
        );
        return
            bytes(uri).length > 0
                ? string(abi.encodePacked(uri, _filename(tokenId)))
                : "";
    }

    /**
     * @notice get fallback token URI based on reveal state of random token
     * @param tokenId token ID of interest
     */
    function tokenURIFallback(uint256 tokenId)
        public
        view
        virtual
        override(IHalalanERC721, HalalanERC721)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "HalalanERC721Random: fallback URI query for nonexistent token"
        );
        return
            bytes(uriFallback).length > 0
                ? string(abi.encodePacked(uriFallback, _filename(tokenId)))
                : "";
    }

    /**
     * @notice set the hidden token filename for the contract
     * @param hidden_ new hidden filename
     */
    function setHidden(string calldata hidden_)
        external
        onlyOwner
        metadataMutable
    {
        emit HiddenUpdated(hidden, hidden_);
        hidden = hidden_;
    }

    /**
     * @notice enable or disable token reveal
     * @param status_ new revealable status
     */
    function setRevealable(bool status_) external onlyOwner {
        emit RevealableUpdated(revealable, status_);
        revealable = status_;
    }

    /**
     * @notice callback handler for response from chainlink vrf
     */
    function fulfillRandomness(bytes32, uint256 randomness_) internal override {
        randomness = randomness_;
    }

    /**
     * @notice finalize pending token reveal
     */
    function _update() internal {
        if (pending == 0 || randomness == 0) {
            return;
        }
        // do fisher-yates shuffle
        uint256 totalRevealed = revealed + pending;
        for (uint256 i = revealed; i < totalRevealed; i++) {
            uint256 idx = i + 1; // index by 1
            uint256 r = idx + (randomness % (max - i));
            uint256 val = shuffle[r] > 0 ? shuffle[r] : r;
            shuffle[r] = shuffle[idx] > 0 ? shuffle[idx] : idx;
            shuffle[idx] = val;
        }
        revealed = totalRevealed;

        // reset
        pending = 0;
        randomness = 0;
    }

    /**
     * @notice get the token filename, accounting for reveal status, shuffle, and preview
     */
    function _filename(uint256 tokenId) internal view returns (string memory) {
        string memory filename;
        if (order[tokenId] == 0) {
            filename = hidden;
        } else if (revealed < order[tokenId]) {
            if (randomness == 0) {
                filename = hidden;
            } else {
                filename = _preview(tokenId).toString();
            }
        } else {
            filename = shuffle[order[tokenId]].toString();
        }
        return filename;
    }

    /**
     * @notice preview a fulfilled, but not finalized, token reveal
     */
    function _preview(uint256 tokenId) internal view returns (uint256) {
        // do fisher-yates shuffle
        uint256 r = order[tokenId];
        uint256[] memory swaps = new uint256[](r - revealed);
        for (uint256 i = 0; i < swaps.length; i++) {
            uint256 idx = i + revealed + 1; // index by 1
            swaps[i] = idx + (randomness % (max - revealed - i));
        }
        // backtrace any swaps preceding token of interest
        for (uint256 i = swaps.length; i > 0; i--) {
            uint256 a = revealed + i;
            uint256 b = swaps[i - 1];
            if (r == a) {
                r = b;
            } else if (r == b) {
                r = a;
            }
        }
        return shuffle[r] > 0 ? shuffle[r] : r;
    }
}
