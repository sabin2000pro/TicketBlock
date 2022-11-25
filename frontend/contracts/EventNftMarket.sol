// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EventNftMarket is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter; 

    Counters.Counter private _listedItems; // 1.0 Store all of the listed items in a counter variable
    Counters.Counter private _tokenIds; // 1.1 Store all of the token IDs 

    uint public listingPrice = 0.025 ether; // 1.2 Set out how much we want to list the token for sale for
    uint256[] private _allNfts;  // 1.3 Store all of the NFTs in an integer array
 
    struct NftItem { // 1.4 Create a Struct for the NFT Token with the token Id, name, price, creator and if it is listed or not
        uint tokenId; // Store the Token ID
        string name; // Store the name of the token
        uint price;  // Store the Price of the token
        address creator;  // Store the address of the token creator
        bool isListed;
    }

    mapping(string => bool) private _usedTokenURIs; // 1.5 Create a mapping for all of the used token names
    mapping(uint => NftItem) private _idToNftItem;  // 1.6 Map every NFT To an ID
    mapping(uint => uint) private _idToNftIndex; // 1.7 - Map the NFT to an Index that it's currently being stored at

    mapping(address => mapping(uint => uint)) private _ownedTokens; // Creating a mapping between the owner address and an integer that stores the owner's owned tokens
    mapping(uint => uint) private _idToOwnedIndex;
    mapping(uint256 => address) public newTokenOwner; // Store the new token owner

    event NftItemCreated (
        uint tokenId,
        string name,
        uint price,
        address creator,
        bool isListed
    );

    event NftPurchased ( // NFT Purchased
        uint tokenId,
        address newTokenOwner,
        string name,
        uint price
    );

    constructor() ERC721("Events NFT", "ENFT") {}

    function mintToken(string memory name, uint price) public payable returns (uint) { // Minting a token requires the name and price
        address sender = msg.sender;

       _tokenIds.increment(); // 1.0 Increment token IDs by 1
       _listedItems.increment();  // 1.1 Increment total listed items by 1

       uint newTokenId = _tokenIds.current();  // 1.2 Get all of the current token IDs

       _safeMint(sender, newTokenId);  // Call _safeMint() to mint the token
       _setTokenURI(newTokenId, name);

       _createNftItem(newTokenId, name, price); // Invoke method to create a new NFT item
       _usedTokenURIs[name] = true;

       return newTokenId;
    }

    function totalSupply() public view returns (uint) { // Return the total supply of the NFTs
        return _allNfts.length; 
    }

    function getTokenByIndex(uint index) public view returns (uint) {
        return _allNfts[index]; // Return index of the NFT
    }

    function getTokenOfOwnerByIndex(address owner, uint index) public view returns (uint) {
        require(index < ERC721.balanceOf(owner), "Index out of bounds");
        return _ownedTokens[owner][index];
    }

    function getNftItem(uint tokenId) public view returns (NftItem memory) { // Get the NFT item
        return _idToNftItem[tokenId];
    }

    function getListedItemsCount() public view returns (uint) { // Return all of the listed items
        return _listedItems.current();
    }

    function buyNft(uint tokenId) public payable { 

        uint price = _idToNftItem[tokenId].price; // Get the price of the token
        string memory name = _idToNftItem[tokenId].name; // Get the name of the token we want to buy

        address owner = ERC721.ownerOf(tokenId);  // Get the owner of the token
        _idToNftItem[tokenId].isListed = false; // Delist the token from circulation

        _listedItems.decrement(); // Delist the token from sale
        newTokenOwner[tokenId] = ERC721.ownerOf(tokenId);
        
        _transfer(owner, msg.sender, tokenId); // Transfer ownership of the token with its associating ID
        payable(owner).transfer(msg.value); // Transfer the token to the new owner and pay them in ETH

        emit NftPurchased(tokenId, newTokenOwner[tokenId], name, price); // Emit an NFT purchased event
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