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

    uint public listingPrice = 0.025 ether;
    uint256[] private _allNfts; 
 
    struct NftItem {
        uint tokenId;
        string name;
        uint price;
        address creator; 
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

    function mintToken(string memory name, uint price) public payable returns (uint) {
        address sender = msg.sender;

       _tokenIds.increment();
       _listedItems.increment();

       uint newTokenId = _tokenIds.current();

       _safeMint(sender, newTokenId);
       _setTokenURI(newTokenId, name);

       _createNftItem(newTokenId, name, price); 
       _usedTokenURIs[name] = true;

       return newTokenId;
    }

    function totalSupply() public view returns (uint) {
        return _allNfts.length; 
    }

    function getTokenByIndex(uint index) public view returns (uint) {
        return _allNfts[index];
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
    
    function mintNftToken(uint tokenId, string memory name, uint newPrice) public payable {
        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].name = name;
        _idToNftItem[tokenId].price = newPrice; // Set new price

        _listedItems.increment(); // Increment the listed items once we are listing it
    }  

    function _createNftItem(uint tokenId, string memory name, uint price) private {
        address sender = msg.sender; // Store the sender address
        _idToNftItem[tokenId] = NftItem(tokenId, name, price, sender, true);
        emit NftItemCreated(tokenId, name, price, msg.sender, true); // Emit an NFT item created event
    }


    function setNftOnSale(uint tokenId, uint newPrice) public payable {

        _idToNftItem[tokenId].isListed = true;
        _idToNftItem[tokenId].price = newPrice; // Set new price
        _listedItems.increment(); // Increment the listed items once we are listing it

    }  
}