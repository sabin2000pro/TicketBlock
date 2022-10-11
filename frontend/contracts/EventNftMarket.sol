// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract EventNftMarket {

    uint256 ticketListingPrice = 0.030 ether;
    address[] private listOfNfts;

    struct EventNft {
        uint256 tokenId;
        address tokenCreator;
        bool tokenIsListed;

    }

    constructor() {}


}