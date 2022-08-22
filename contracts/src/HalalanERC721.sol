/*
HalalanERC721

SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./interfaces/IHalalanERC721.sol";

/**
 * @title HalalanERC721
 *
 * @notice this implements an ERC721 token backed by Halalan
 */
contract HalalanERC721 is IHalalanERC721, ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // events
    event UriUpdated(string previous, string updated);
    event UriFallbackUpdated(string previous, string updated);
    event MintableUpdated(bool previous, bool updated);
    event RoyaltyUpdated(uint256 previous, uint256 updated);
    event ReceiverUpdated(address previous, address updated);
    event MetadataFrozen(string uri);

    // members
    uint256 public total;
    uint256 public immutable max;
    bool public mintable;
    bool public frozen;
    string public allocation;
    string public uri;
    string public uriFallback;
    uint256 public royalty;
    address public receiver;

    /**
     * @param name_ token name
     * @param symbol_ token symbol
     * @param uri_ base token uri
     * @param max_ max token supply (0 for infinite)
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        uint256 max_
    ) ERC721(name_, symbol_) {
        uri = uri_;
        uriFallback = uri_;
        max = max_;
        receiver = msg.sender;
    }

    /**
     * @notice modifier to ensure public mint is active
     */
    modifier publicMintable() {
        require(mintable, "HalalanERC721: public mint not enabled");
        _;
    }

    /**
     * @notice modifier to ensure metadata is not frozen
     */
    modifier metadataMutable() {
        require(!frozen, "HalalanERC721: metadata is frozen");
        _;
    }

    /**
     * @inheritdoc IERC165
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @inheritdoc IERC2981
     */
    function royaltyInfo(uint256 tokenId, uint256 salePrice)
        external
        view
        returns (address, uint256)
    {
        return (receiver, (salePrice * royalty) / 1e18);
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function mintOwner(uint256 amount) external virtual onlyOwner nonReentrant {
        require(
            max == 0 || total + amount <= max,
            "HalalanERC721: exceeds max token supply"
        );
        for (uint256 i = 0; i < amount; i++) {
            total += 1;
            _mint(msg.sender, total);
        }
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function mint(uint256 amount) external payable virtual publicMintable {
        require(false, "HalalanERC721: public mint not implemented");
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function price() external view virtual returns (uint256) {
        return 0.0 ether;
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function batch() external view virtual returns (uint256) {
        return 0;
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function tokenURIFallback(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "HalalanERC721: fallback URI query for nonexistent token"
        );
        return
            bytes(uriFallback).length > 0
                ? string(abi.encodePacked(uriFallback, tokenId.toString()))
                : "";
    }

    /**
     * @notice set the base token URI for the contract
     * @param uri_ new base token URI
     */
    function setURI(string calldata uri_) external onlyOwner metadataMutable {
        emit UriUpdated(uri, uri_);
        uri = uri_;
    }

    /**
     * @notice set the fallback base token URI for the contract
     * @param uri_ new fallback base token URI
     */
    function setURIFallback(string calldata uri_)
        external
        onlyOwner
        metadataMutable
    {
        emit UriFallbackUpdated(uriFallback, uri_);
        uriFallback = uri_;
    }

    /**
     * @notice enable or disable public mint
     * @param status_ new mintable status
     */
    function setMintable(bool status_) external onlyOwner {
        emit MintableUpdated(mintable, status_);
        mintable = status_;
    }

    /**
     * @notice set royalty amount for ERC2981
     * @param royalty_ new royalty amount with 18 decimals
     */
    function setRoyalty(uint256 royalty_) external onlyOwner {
        emit RoyaltyUpdated(royalty, royalty_);
        royalty = royalty_;
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function setReceiver(address receiver_) external onlyOwner {
        emit ReceiverUpdated(receiver, receiver_);
        receiver = receiver_;
    }

    /**
     * @notice withdraw eth balance from token contract
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice withdraw eth balance from token contract
     */
    function freeze() external onlyOwner metadataMutable {
        frozen = true;
        emit MetadataFrozen(uri);
    }

    /**
     * @dev internal method override to define base token uri
     */
    function _baseURI() internal view override returns (string memory) {
        return uri;
    }
}
