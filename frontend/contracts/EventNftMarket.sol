// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EventNftMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _listedItems; // Used for incrementing counter index
    Counters.Counter private _tokenIds; // Unique number for the tokens starting at index 1 (total nfts created)

    uint public listingPrice = 0.025 ether; // For how much we place the NFT on sale
    uint256[] private _allNfts; // Array of all the NFTS

        // Group Multiple Related Data for the token
    struct NftItem {
        uint tokenId;
        string name;
        uint price; 
        address creator;
        bool isListed;
    }

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint => NftItem) private _idToNftItem;
    mapping(uint => uint) private _idToNftIndex;

    mapping(address => mapping(uint => uint)) private _ownedTokens; // Mapping between the address of the owner and an integer that stores the owner tokens ID
    mapping(uint => uint) private _idToOwnedIndex;

    event NftItemCreated (
        uint tokenId,
        string name,
        uint price,
        address creator,
        bool isListed
    );

    event NftPurchased (
        uint tokenId,
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

    function buyNft(uint tokenId) public payable { // Function to buy NFT. The function payable which means the user must pay ether to invoke the function
        uint price = _idToNftItem[tokenId].price; // Get the price of the item
        string memory name = _idToNftItem[tokenId].name;
        address owner = ERC721.ownerOf(tokenId); // Get the owner of the token using ownerOf

        _idToNftItem[tokenId].isListed = false; // Token is no longer listed
        _listedItems.decrement(); // Decrement the value
        
        _transfer(owner, msg.sender, tokenId); // Transfer Ownership of the NFT and pay the NFT owner
        payable(owner).transfer(msg.value);

        emit NftPurchased(tokenId, name, price);
    }

    // Place the NFT for sale function.
    function mintNftToken(uint tokenId, string memory name, uint newPrice) public payable {

        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].name = name;
        _idToNftItem[tokenId].price = newPrice; // Set new price

        _listedItems.increment(); // Increment the listed items once we are listing it
    }  

    // Function to create NFT item. We need to know the token ID and the price
    function _createNftItem(uint tokenId, string memory name, uint price) private {

        _idToNftItem[tokenId] = NftItem(tokenId, name, price, msg.sender, true);
        emit NftItemCreated(tokenId, name, price, msg.sender, true); // Emit an NFT item created event
    }

       // Place the NFT for sale function.
    function setNftOnSale(uint tokenId, uint newPrice) public payable {
        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].price = newPrice; // Set new price
        _listedItems.increment(); // Increment the listed items once we are listing it
    }  


    
}