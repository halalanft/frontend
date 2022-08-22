/*
IHalalanERC721Random

SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.15;

import "./IHalalanERC721.sol";

/**
 * @title Halalan ERC721 random interface
 *
 * @notice this defines the interface for the random Halalan ERC721 token contract
 */
interface IHalalanERC721Random is IHalalanERC721 {
    /**
     * @notice initiate reveal of tokens
     * @param tokens list of token ids to be revealed
     */
    function reveal(uint256[] calldata tokens) external returns (bytes32);

    /**
     * @notice get reveal order of random token
     * @param tokenId token id of interest
     */
    function order(uint256 tokenId) external view returns (uint256);
}
