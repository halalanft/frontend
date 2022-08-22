/*
IHalalanERC721

SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.15;

import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";

/**
 * @title halalan ERC721 interface
 *
 * @notice this defines the interface for the base Halalan ERC721 token contract
 */
interface IHalalanERC721 is IERC721Metadata, IERC2981 {
    /**
     * @notice mint tokens as admin
     * @param amount number of tokens to mint
     */
    function mintOwner(uint256 amount) external;

    /**
     * @notice mint tokens as standard public user
     * @param amount number of tokens to mint
     */
    function mint(uint256 amount) external payable;

    /**
     * @notice get price to mint token
     */
    function price() external view returns (uint256);

    /**
     * @notice get total token supply
     */
    function total() external view returns (uint256);

    /**
     * @notice get max token supply
     */
    function max() external view returns (uint256);

    /**
     * @notice get max token mint batch size
     */
    function batch() external view returns (uint256);

    /**
     * @notice get fallback Uniform Resource Identifier (URI) for `tokenId` token
     * @param tokenId token ID of interest
     */
    function tokenURIFallback(uint256 tokenId)
        external
        view
        returns (string memory);

    /**
     * @notice set royalty receiver for ERC2981
     * @param receiver new royalty receiver
     */
    function setReceiver(address receiver) external;
}
