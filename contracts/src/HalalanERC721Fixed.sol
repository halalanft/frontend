/*
HalalanERC721Fixed

SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.15;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./HalalanERC721.sol";

/**
 * @title HalalanERC721Fixed
 *
 * @notice this extends the HalalanERC721 contract and implements
 * fixed price public minting
 */
contract HalalanERC721Fixed is HalalanERC721 {
    // events
    event PriceUpdated(uint256 previous, uint256 updated);
    event BatchUpdated(uint256 previous, uint256 updated);

    // members
    uint256 private immutable _price;
    uint256 public immutable override batch;

    /**
     * @param name_ token name
     * @param symbol_ token symbol
     * @param uri_ base token uri
     * @param max_ max token supply
     * @param price_ token mint price
     * @param batch_ max token mint batch size
     */
    constructor(
        string memory name_,
        string memory symbol_,
        string memory uri_,
        uint256 max_,
        uint256 price_,
        uint256 batch_
    ) HalalanERC721(name_, symbol_, uri_, max_) {
        _price = price_;
        batch = batch_;
    }

    /**
     * @notice mint tokens as standard public user
     * @param amount number of tokens to mint
     */
    function mint(uint256 amount)
        external
        payable
        virtual
        override
        nonReentrant
        publicMintable
    {
        require(
            amount <= batch,
            "HalalanERC721Fixed: exceeds max batch mint size"
        );
        require(
            total + amount <= max,
            "HalalanERC721Fixed: exceeds max token supply"
        );
        require(
            msg.value == amount * _price,
            "HalalanERC721Fixed: invalid payment amount"
        );
        for (uint256 i = 0; i < amount; i++) {
            total += 1;
            _mint(msg.sender, total);
        }
    }

    /**
     * @inheritdoc IHalalanERC721
     */
    function price() public view override returns (uint256) {
        return _price;
    }
}
