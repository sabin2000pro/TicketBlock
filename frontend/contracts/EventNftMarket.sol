// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

// Interface for the NFT routines to be invoked
interface NftRoutines {
    function mintNftToken(string memory tokenUri, uint256 tokenPrice) external payable returns (uint);
    function setNftOnSale(uint id, uint price) external payable returns (uint); // 3. Routine to set the nft on sale
    function buyNft(uint id) external payable; // Routing to buy the NFT given a token Index and price
    function checkTokenCreatorIsOwner(uint256 tokenId) external returns (bool);
}

contract EventNftMarket is ERC721URIStorage, Ownable, NftRoutines {
    using Counters for Counters.Counter;

    Counters.Counter private listedTokenItems; // Listed Token Items
    Counters.Counter private tokenIds; // Number that stores how many token's we have

    uint256[] private listOfNfts; // Store the list of NFTs in an array
    bool private tokenMinted;

    mapping(string => bool) private usedTokenURIs; // Map string to boolean for checking the used token URis
    mapping(uint => EventNft) private mappedNftData;
    mapping(uint => uint) private mappedIdToIndex; // Map an ID to the index of a token

    mapping(address => mapping(uint => uint)) private ownedEventTokens; // Mapping between the address of the owner and an integer that stores the owner tokens ID
    mapping(uint => uint) private _idToOwnedIndex;

    struct EventNft { // Struct for holding Event NFT data
        uint256 id;
        string name;
        uint256 price;
        address tokenCreator;
        bool isTokenListed; // Determines if the token is listed for sale or not
    }

    // 1. Event for Creating New Ticket nft Data
    event EventNftCreated (
        uint id,
        uint price,
        string name,
        address creator,
        bool isTokenListed
    );

    // 2. Event For Updating NFT data
    event EventNftUpdated (
        uint id,
        uint newPrice,
        address newCreator,
        bool newIsTokenListed
    );

    event SetNftOnSale (
        uint newId,
        uint newPrice
    );

    event FetchNfts (
        EventNft[] nfts
    );

    event NftPurchased (
        uint id,
        bool isTokenListed,
        address currentOwner,
        string name,
        uint price
    );

    constructor() ERC721("Event Tickets NFT", "ETNFT") {}


    function isTokenNotOnSale(uint256 tokenId) public payable returns (bool) {
        return mappedNftData[tokenId].isTokenListed == false;
    }

    function isTokenAlreadyOnSale(uint256 tokenId) public payable returns (bool) {
         return mappedNftData[tokenId].isTokenListed == true;
    }

    function getNftTotalSupply() public view returns (uint256) {
        return listOfNfts.length;
    }

    function fetchCurrentTokenIds() public view returns (uint256) {
        return tokenIds.current();
    }

    // @description: Fetch an NFT token by its index
    function retrieveTokenByIndex(uint index) public view returns (uint) {
       return listOfNfts[index];
    }

    function mintNftToken(string memory name, uint price) public payable override returns (uint) {        
        address messageSender = msg.sender;

        tokenIds.increment();
        listedTokenItems.increment();

        uint newTokenId = tokenIds.current();

        _safeMint(messageSender, newTokenId);
        _setTokenURI(newTokenId, name); 

        createNewNftItem(newTokenId, price, name);
        usedTokenURIs[name] = true;

        return newTokenId;
     
    }

    function createNewNftItem(uint id, uint price, string memory name) private {
       address currentOwner = msg.sender;
       mappedNftData[id] = EventNft(id, name, price, currentOwner, true);

       emit EventNftCreated(id, price, name, msg.sender, true); // Emit new created event
    }

    function getPriceOfNftToken(uint256 tokenId) public view returns (uint256) {
        uint currentPrice = mappedNftData[tokenId].price;
        return currentPrice; // Return the token price of the nFT
    }

    function buyNft(uint id) public payable {

        address currentOwner = ERC721.ownerOf(id);
        mappedNftData[id].isTokenListed = false;         // Now we need to delist it from the struct

        listedTokenItems.decrement(); // Decrement the listed items by 1.

         _transfer(currentOwner, msg.sender, id); // Transfer Ownership of the NFT from the current owner to ms.sender
         payable(currentOwner).transfer(msg.value);

         emit NftPurchased(id, mappedNftData[id].isTokenListed, currentOwner, mappedNftData[id].name, mappedNftData[id].price);
         
    }

    function checkTokenCreatorIsOwner(uint256 tokenId) public view override returns (bool) {
        return msg.sender == ERC721.ownerOf(tokenId); // The owner of the token ID is equal to the ERC721 invoked routine of the token ID
    }

    function setNftOnSale(uint id, uint price) external payable override returns (uint) {

        mappedNftData[id].isTokenListed = true;
        mappedNftData[id].price = price; // Update the new token price

        if(listedTokenItems.current() == 0) { // If the current items on sale is by default 0
            listedTokenItems.increment();    // Increment Listed Items
        }

        emit SetNftOnSale(mappedNftData[id].id, mappedNftData[id].price);

        return mappedNftData[id].price;

    }

    // @description: Retrieves all of the event ticket NFT's on sale.
    // @returns: An array of Event NFT Tokens stored in memory

    function fetchAllNftsOnSale() public view returns (EventNft[] memory) {
        uint totalNftSupply = getNftTotalSupply();
        uint currentTokenIndex = 0; // Current index of the token
        
        uint currentNftItem = listedTokenItems.current();

        EventNft[] memory nftItems = new EventNft[](currentNftItem);

        for(uint256 index = 0; index < totalNftSupply; index++) { // For every token in supply

            uint256 tokenIndex = retrieveTokenByIndex(index); // Get the token at index

            EventNft storage tokenItem = mappedNftData[tokenIndex];
           
           if(tokenItem.isTokenListed) { // If the token is listed
              nftItems[currentTokenIndex] = tokenItem;
              currentTokenIndex += 1; // Increment number of token indexes
           }

        }   

        return nftItems; // Return all of the NFT items
    }

    // Logic for getting all of the user's owned Event Ticket NFT's
    // @description Fetch all of the user's owned NFTs
    // @returns: An array of event nft items

    function fetchAllOwnedNFTs() public view returns(EventNft[] memory) {
       uint256 currentNftCount = ERC721.balanceOf(msg.sender);
       EventNft[] memory nftItems = new EventNft[](currentNftCount);

       for(uint256 index = 0; index < currentNftCount; index++) {

         uint256 tokenId = fetchTokenOwner(msg.sender, index);

         EventNft storage nftItem = mappedNftData[tokenId];
         nftItems[index] = nftItem;
       }

       return nftItems;
    }

    function fetchTokenOwner(address tokenOwner, uint256 tokenIndex) public view returns(uint256) {
        return ownedEventTokens[tokenOwner][tokenIndex];
    }

    // @description: Return the total supply of event ticket nft's by returning the array length.
    function fetchTokenSupply() public view returns (uint256) {
        return listOfNfts.length + 1;
    }

    function checkTokenExists(string memory tokenURI) public view returns (bool) {
        return usedTokenURIs[tokenURI] == true;
    }

    function returnSingleNftItem(uint256 tokenId) public view returns(EventNft memory) {
        return mappedNftData[tokenId]; // Return the mapped NFT ID to the token ID
    }

}