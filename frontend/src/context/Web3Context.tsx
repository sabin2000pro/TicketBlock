/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext, useState, createContext, ReactNode, useEffect} from 'react';
import Web3 from 'web3';
import EventNftContract from '../contracts/EventNftMarket.json';
import axios from 'axios';
import {getLoggedInUser} from '../api/auth-api';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    accounts: any,
    balance: any,

    connectWallet: () => void
    handleAccountChange: () => void

    fetchNftData: () => any
    mintNft: (name: string, price: number) => void
    buyNft: (id: number) => void

    setNftOnSale: (id: number, price: number) => any
    fetchAllNftsOnSale: (nfts: any[]) => Promise<any>
    chosenAccount: any
   
}

const provider = window.ethereum;
const web3 = new Web3(provider as any)
let chosenAccount = "" as any

let PORT = 5201 as number;
let URL = `http://localhost:${PORT}/api/v1/nfts`;

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {

    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");
    let [accountChanged, setAccountChanged] = useState<boolean | undefined>(false);

    const [accountChosen, setAccountChosen] = useState<boolean | undefined>(false);
    const [tokenMinted, setTokenMinted] = useState<boolean | false>(false) // True or false that determines if the token has been minted or not

    let [tokensOwned, setTokensOwned] = useState<any[] | undefined>([]);
    const [idValidated, setIdValidated] = useState<boolean | undefined>(false);

    const networks = EventNftContract.networks
    let networkId = Object.keys(networks)[0] as keyof typeof networks; // Network ID 5777

    const connectWallet = async () => {

    try {

        const currAccount = await window.ethereum!.request({method: "eth_requestAccounts"}) as any
        const currBalance = await web3.eth.getBalance(currAccount.toString());

        const formattedBalance = Web3.utils.fromWei(currBalance)

        setBalance(formattedBalance as any);
        
        chosenAccount = currAccount[0];
        accounts = currAccount[0];

        setAccountChosen(!accountChosen);
        setAccounts(currAccount[0])

        // If we are not authenticated, DO NOT store the account & formatted baalnce in local storage
        if(!processAuthToken()) {
            return null
        }

        else {
            localStorage.setItem("account", accounts)
            localStorage.setItem("balance", formattedBalance);
        }

        balance = formattedBalance

    }
         
        catch(error: any) {
            return console.log(`Error : `, error);
        }
    }

    const processAuthToken = () => {
        return localStorage.getItem("token") !== null
    }

    const handleAccountChange = () => {

        window.ethereum?.on("accountsChanged", (accounts) => {

             setAccountChanged(!accountChanged);
             chosenAccount = accounts as any;
        })


    }

    useEffect(() => {

        const connectToWallet = async () => {
            await connectWallet();
        }

        connectToWallet();

    }, [])

    const fetchNftData = async (...args: unknown[]): Promise<any> => {

        try {

            const response = await axios.get(URL);
            const nftData = response.data.data;

            return nftData;
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }

        }

    }

    const validateNftId = () => {
        // Code to make sure that the created NFT id is not equal to an existing one in the database
    }

    // This sub-routine is going to be invoked when creating a new NFT on the server-side (POST data to the database)
    // After data is POSTED, invoke the mintNft routine with the name and price being sent to activate the smart contract which calls the mintNft function

    const mintNft = async (name: string, price: number): Promise<any> => {
        const contractAbi = EventNftContract.abi;
        const currentAccount = localStorage.getItem("account");

        const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as unknown as any)
        const mintedNft = await nftContract.methods.mintNftToken(name, price).send({from: currentAccount as unknown as WindowLocalStorage})

        setTokenMinted(!tokenMinted)

        const nftValues = mintedNft.events.EventNftCreated.returnValues;
        const tokenId = parseInt(nftValues.id)

        let creator = nftValues.creator
        let isTokenListed = nftValues.isTokenListed
        isTokenListed = !(isTokenListed);
    
        const mintedNftData = {tokenId, name, price, creator, isTokenListed}

        const tokenResponse = await axios.post(URL, {tokenId, name, price, creator});
        const tokenData = tokenResponse.data.data;

        let creatorId = tokenResponse.data.data.id
        creatorId = creator;

        const txHash = mintedNft.events.EventNftCreated.transactionHash
        const userTxHash = await fetchTransactionReceipt(txHash);

        tokensOwned!.push(tokenData, {userTxHash}) as unknown as any;

        console.log(`User tx hash : `, userTxHash);

        const userData = await getLoggedInUser(); // Get logged in user and extract number of minted nfts field and increment by 1 every time an nft is minted


        const userAccountData = userData.data.data.accountAddress
         console.log(userAccountData);

        

        
        return mintedNftData;
    }

    // VERY IMPORTANT - TO ENSURE THAT THE TRANSACTION IS AUTHENTIC AND WENT THROUGH

    const fetchTransactionReceipt = async (txHash: any): Promise<any> => {

        try {

            let txReceipt = await web3.eth.getTransactionReceipt(txHash);

            if (txReceipt.blockNumber === undefined) {
                 throw new Error("Transaction is not valid")
             }

            return txReceipt.transactionHash
         }
         
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }

        }

    }

    // @params: id: ID of the NFT
    // @params: price: Price of the NFT when setting it on sale

    const setNftOnSale = async (id: number, price: number) => {

        try {

            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)
            const nftOnSale = await nftContract.methods.setNftOnSale(id, price).send({from: localStorage.getItem("account") as any});

            // Code below to delist the NFT from available NFTs (send DELETE request)


            return nftOnSale;
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }


        }
    }

    // @params: id: ID of the NFT to buy
    // @ Pre Condition: Before buying an NFT it must be present in the database (available NFTs for sale)
    // @ Post Condition: Delisted NFT from the database (Deleted using DELETE request)

    const buyNft = async (id: number) => {

        try {

            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)
            const boughtNft = await nftContract.methods.buyNft(id).send({from: localStorage.getItem("account") as any})

            const nftValues = boughtNft.events.NftPurchased.returnValues
            const nftOwner = nftValues.currentOwner;
            const nftId = nftValues.id;

            const nftTokenListed = nftValues.isTokenListed
            const nftPrice = nftValues.price

            const nftData = {nftOwner, nftId, nftTokenListed, nftPrice};

            // Buy NFT Logic. First fetch the user data and extract the owned NFTs value. When the function is invoked
            // Increment the ownedNfts++ by 1 every time and store that number in the Owned NFts on User Profile
            
            return nftData
            
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }

        }
    }

    // Smart Contract Function: Get all of the nfts on sale (in the background fetch the nfts that are on sale and store them in an array)
    // @Returns: Array of NFTs on sale
    
    const fetchAllNftsOnSale = async (nfts: any[]): Promise<any> => {

        try {

            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)

            let listedNftsOnSale = await nftContract.methods.fetchAllNftsOnSale().call();
            return listedNftsOnSale // Return all of the nfts on sale
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }


        }

    }

    return <Web3Context.Provider value = {{connectWallet, chosenAccount, handleAccountChange, accounts, balance, fetchNftData, mintNft, buyNft, setNftOnSale, fetchAllNftsOnSale}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}