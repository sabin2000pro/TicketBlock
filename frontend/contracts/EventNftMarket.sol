// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EventNftMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private listedTokens;
    Counters.Counter private tokenIds; // Number that stores how many token's we have

    uint256 ticketListingPrice = 0.030 ether; // Listing price for the event NFT
    uint256[] private listOfNfts;

    struct EventNft {
        uint256 tokenId;
        uint256 tokenPrice;
        address tokenCreator;
        bool isTokenListed; // Determines if the token is listed for sale or not
    }

    event EventNftCreated (
        uint tokenId,
        uint price,
        address creator,
        bool isListed
    );

    constructor() ERC721("Events NFT", "ENFT") {

    }

    function initialiseListingPrice(uint256 newListingPrice) external onlyOwner {
        require(newListingPrice > 0, "Make sure that the listing is > 0 GWEI");
        ticketListingPrice = newListingPrice;
    }

    // @description: Register a new token on the blockchain
    function mintNftToken(string memory tokenUri, uint256 tokenPrice) public payable returns (uint256) {

    }

    function retrieveTokenByIndex(uint index) public view returns (uint) {
       return listOfNfts[index];
    }

    function fetchTokenSupply() public view returns (uint256) {
        return listOfNfts.length;
    }

}