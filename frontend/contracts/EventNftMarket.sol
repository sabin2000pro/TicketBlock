// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EventNftMarket is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _listedItems;
    Counters.Counter private _tokenIds; 

    uint public listingPrice = 0.025 ether; // For how much we place the NFT on sale
    uint256[] private _allNfts; // Array of all the NFTS

        // Group Multiple Related Data for the token
    struct NftItem {
        uint tokenId; // Token ID
        string name;
        uint price; 

        address creator; // Creator of the token
        bool isListed;
    }

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint => NftItem) private _idToNftItem;
    mapping(uint => uint) private _idToNftIndex;

    mapping(address => mapping(uint => uint)) private _ownedTokens; // Mapping between the address of the owner and an integer that stores the owner tokens ID
    mapping(uint => uint) private _idToOwnedIndex;
    mapping(uint256 => address) public newTokenOwner;

    event NftItemCreated (
        uint tokenId,
        string name,
        uint price,
        address creator,
        bool isListed
    );

    event NftPurchased (
        uint tokenId,
        address newTokenOwner,
        string name,
        uint price
    );

    constructor() ERC721("Events NFT", "ENFT") {}

    function mintToken(string memory name, uint price) public payable returns (uint) {

       _tokenIds.increment(); // Increment the Token ID by 1
       _listedItems.increment(); // Increment number of listed tokens by 1

       address sender = msg.sender; // The address of the sender
       uint newTokenId = _tokenIds.current(); // Get the current token ID

       _safeMint(sender, newTokenId); // Call the _safeMint function on the sender with the new token id
       _setTokenURI(newTokenId, name); // Set the new token URI with the token ID

       _createNftItem(newTokenId, name, price); // Create new NFT item after minting it.
       _usedTokenURIs[name] = true;

       return newTokenId; // Return the new token ID
    }

    // Returns how many NFTs we have in circulation
    function totalSupply() public view returns (uint) {
        return _allNfts.length; 
    }

    // Function to retrieve a particular NFT token by its index.
    // @returns: The index as an integer

    function getTokenByIndex(uint index) public view returns (uint) {
        return _allNfts[index]; // Return index of the NFT
    }

    function getTokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
        require(index < ERC721.balanceOf(owner), "Index out of bounds");

        return _ownedTokens[owner][index];
    }

    function getNftItem(uint tokenId) public view returns (NftItem memory) {
        return _idToNftItem[tokenId];
    }

    // Function gets a list of items
    function getListedItemsCount() public view returns (uint) {
        return _listedItems.current();
    }

    function buyNft(uint tokenId) public payable { 

        uint price = _idToNftItem[tokenId].price; 
        string memory name = _idToNftItem[tokenId].name;

        address owner = ERC721.ownerOf(tokenId);  // Get the owner of the token

        _idToNftItem[tokenId].isListed = false;
        _listedItems.decrement(); // Delist the token from sale
        newTokenOwner[tokenId] = ERC721.ownerOf(tokenId);
        
        _transfer(owner, msg.sender, tokenId); // Transfer ownership of the token with its associating ID
        payable(owner).transfer(msg.value); // Transfer the token to the new owner and pay them in ETH

        emit NftPurchased(tokenId, newTokenOwner[tokenId], name, price);
    }

    // @params: Token ID, Name and Price
    function mintNftToken(uint tokenId, string memory name, uint newPrice) public payable {

        _idToNftItem[tokenId].isListed = true;
        
        _idToNftItem[tokenId].name = name;
        _idToNftItem[tokenId].price = newPrice; // Set new price

        _listedItems.increment(); // Increment the listed items once we are listing it
    }  

    // Function to create NFT item. We need to know the token ID and the price
    function _createNftItem(uint tokenId, string memory name, uint price) private {
        address sender = msg.sender; // Store the sender address

        _idToNftItem[tokenId] = NftItem(tokenId, name, price, sender, true);
        emit NftItemCreated(tokenId, name, price, msg.sender, true); // Emit an NFT item created event

    }

       // Place the NFT for sale function.
    function setNftOnSale(uint tokenId, uint newPrice) public payable {
        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].price = newPrice; // Set new price

        _listedItems.increment(); // Increment the listed items once we are listing it
    }  
}