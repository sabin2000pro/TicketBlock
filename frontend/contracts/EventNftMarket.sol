// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

// Interface for the NFT routines to be invoked
interface NftRoutines {
    function initialiseListingPrice(uint256 newListingPrice) external;
    function mintNftToken(string memory tokenUri, uint256 tokenPrice) external payable returns (uint256);
    function setNftOnSale(uint256 tokenIndex, uint256 newTokenPrice) external payable; // 3. Routine to set the nft on sale
    function buyNft(uint256 tokenInde) external payable; // Routing to buy the NFT given a token Index and price
    function removeNftFromSale(uint256 tokenIndex) external payable; // Removing an NFT from sale requires that we pay some ether 
    function checkTokenCreatorIsOwner(uint256 tokenId) external returns (bool);
}

contract EventNftMarket is ERC721URIStorage, Ownable, NftRoutines {
    using Counters for Counters.Counter;

    Counters.Counter private listedTokenItems; // Listed Token Items
    Counters.Counter private tokenIds; // Number that stores how many token's we have

    uint256 ticketListingPrice = 0.030 ether; // Listing price for the event NFT. Initially sell one for 0.030 ETHER
    uint256[] private listOfNfts; // Store the list of NFTs in an array
    bool private tokenMinted;

    mapping(string => bool) private usedTokenURIs; // Map string to boolean for checking the used token URis
    mapping(uint => EventNft) private mappedNftData;
    mapping(uint => uint) private mappedIdToIndex; // Map an ID to the index of a token

    mapping(address => mapping(uint => uint)) private ownedEventTokens; // Mapping between the address of the owner and an integer that stores the owner tokens ID
    mapping(uint => uint) private _idToOwnedIndex;

    struct EventNft { // Struct for holding Event NFT data
        uint256 tokenId;
        uint256 tokenPrice;
        address tokenCreator;
        bool isTokenListed; // Determines if the token is listed for sale or not
    }

    // 1. Event for Creating New Ticket nft Data
    event EventNftCreated (
        uint tokenId,
        uint price,
        address creator,
        bool isTokenListed
    );

    // 2. Event For Updating NFT data
    event EventNftUpdated (
        uint tokenId,
        uint newPrice,
        address newCreator,
        bool newIsTokenListed
    );

    constructor() ERC721("Event Tickets NFT NFT", "ETNFT") {}

    // @description: Set the listing price for a token
    function initialiseListingPrice(uint256 newListingPrice) public override onlyOwner {
        uint256 defaultPrice = 0;
        require(newListingPrice > defaultPrice, "Make sure that the listing is > 0 GWEI");
        ticketListingPrice = newListingPrice;
    }


    function isTokenNotOnSale(uint256 tokenId) public payable returns (bool) {
        return mappedNftData[tokenId].isTokenListed == !true;
    }

    function isTokenAlreadyOnSale(uint256 tokenId) public payable returns (bool) {
         return mappedNftData[tokenId].isTokenListed == !false;
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


    // @description: Register a new token on the blockchain.
    // @returns: The ID of that token minted
    // @ Pre Condition: Must ensure that the token URI (data) exists and the price of the new token is the actual listing price for the token
    // @ Post Condition: Return the new token Id that is created by invoking the _safeMint() in-built function and the create new nft function
    // @ Parameters: Token URI & Price of the token


    function mintNftToken(string memory tokenUri, uint256 tokenPrice) public payable override returns (uint256) {
        require(!checkTokenExists(tokenUri), "Please ensure that the token URI exists");
        require(msg.value == ticketListingPrice, "Please ensure the price of the new token is set to the listing price");
        address messageSender = msg.sender;

        tokenIds.increment();
        listedTokenItems.increment();
        uint newTokenId = tokenIds.current();

        _safeMint(messageSender, newTokenId);
        _setTokenURI(newTokenId, tokenUri); // Set the new token URI with the token ID

        createNewNftItem(newTokenId, tokenPrice); // Invoke routine to create the new NFT item below
        usedTokenURIs[tokenUri] = true;

        return newTokenId;
    }

    function createNewNftItem(uint256 tokenId, uint256 tokenPrice) private {
       address currentOwner = msg.sender;
       mappedNftData[tokenId] = EventNft(tokenId, tokenPrice, currentOwner, true);

       emit EventNftCreated(tokenId, tokenPrice, msg.sender, true); // Emit new created event

    }

    function getPriceOfNftToken(uint256 tokenId) public view returns (uint256) {
        uint currentPrice = mappedNftData[tokenId].tokenPrice;
        return currentPrice;
    }

    function buyNft(uint256 tokenId) public payable {
        address currentOwner = ERC721.ownerOf(tokenId);
        require(msg.sender == currentOwner, "Please ensure that you are the owner of the token");
        require(msg.value == getPriceOfNftToken(tokenId), "Please submit a value price for the token");

        // Now we need to delist it from the struct
        mappedNftData[tokenId].isTokenListed = false;
        listedTokenItems.decrement(); // Decrement the listed items by 1.

         _transfer(currentOwner, msg.sender, tokenId); // Transfer Ownership of the NFT from the current owner to ms.sender
         payable(currentOwner).transfer(msg.value); // Pay the new owner
    }

    function checkTokenCreatorIsOwner(uint256 tokenId) public view override returns (bool) {
        return msg.sender == ERC721.ownerOf(tokenId); // The owner of the token ID is equal to the ERC721 invoked routine of the token ID
    }

    // Check if the listing price is valid or not
    function isValidListingPrice() public payable returns (bool) {
        return msg.value == ticketListingPrice;
    }

    function setNftOnSale(uint256 tokenId, uint256 newTokenPrice) external payable override {
        require(checkTokenCreatorIsOwner(tokenId), "Please make sure that the creator of the token is the current owner before placing the nft on sale");
        require(isTokenAlreadyOnSale(tokenId), "Please make sure that the token is not already on sale...");

        mappedNftData[tokenId].isTokenListed = true;
        mappedNftData[tokenId].tokenPrice = newTokenPrice; // Update the new token price

        if(listedTokenItems.current() == 0) { // If the current items on sale is by default 0
            listedTokenItems.increment();    // Increment Listed Items

        }

    }

    function removeNftFromSale(uint256 tokenId) external payable override {
        require(isTokenAlreadyOnSale(tokenId), "Before removing from sale. Please make sure it is already on sale");
    }


    // @description: Retrieves all of the event ticket NFT's on sale.
    // @returns: An array of Event NFT Tokens stored in memory

    function fetchAllNftsOnSale() public view returns (EventNft[] memory) {
        uint totalNftSupply = getNftTotalSupply();
        uint currentTokenIndex = 0; // Current index of the token
        uint currentNftItem = listedTokenItems.current();

        EventNft[] memory nftItems = new EventNft[](currentNftItem);

        for(uint256 index = 0; index < totalNftSupply; index++) {

            uint256 tokenIndex = retrieveTokenByIndex(index);

            EventNft storage tokenItem = mappedNftData[tokenIndex];
           
           if(tokenItem.isTokenListed) { // If the token is listed
              nftItems[currentTokenIndex] = tokenItem; // Set the token index from the nft items array to the token item
              currentTokenIndex +=1; // Increment number of token indexes
           }
        }

        return nftItems; // Return all of the NFT items
    }

        // Logic for getting all of the user's owned Event Ticket NFT's
    // @description Fetch all of the user's owned NFTs
    // @returns: An array of event nft items

    function fetchAllOwnedNFTs() public view returns(EventNft[] memory) {
       
    }

    // @description: Return the total supply of event ticket nft's by returning the array length.
    function fetchTokenSupply() public view returns (uint256) {
        return listOfNfts.length;
    }

    function checkTokenExists(string memory tokenURI) public view returns (bool) {
        return usedTokenURIs[tokenURI] == true;
    }

    function returnSingleNftItem(uint256 tokenId) public view returns(EventNft memory) {
        return mappedNftData[tokenId]; // Return the mapped NFT ID to the token ID
    }

}