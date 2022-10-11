// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract EventNftMarket {

    uint256 ticketListingPrice = 0.030 ether; // Listing price for the event NFT
    address[] private listOfNfts;

    struct EventNft {
        uint256 tokenId;
        uint256 tokenPrice;
        address tokenCreator;
        bool tokenIsListed;
    }

    constructor() {}


}