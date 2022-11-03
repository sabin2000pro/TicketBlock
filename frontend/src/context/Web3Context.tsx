import { ethers } from 'ethers';
import {useContext, useState, createContext, ReactNode, useEffect} from 'react';
import Web3 from 'web3';
import EventNftContract from '../contracts/EventNftMarket.json';
import axios from 'axios';

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
    fetchAllNftsOnSale: () => any
   
}

const provider = window.ethereum;
const web3 = new Web3(provider as any)
let chosenAccount;

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");
    let [accountChanged, setAccountChanged] = useState<boolean | undefined>(false);
    const [tokenMinted, setTokenMinted] = useState<boolean | false>(false)

    const networks = EventNftContract.networks
    let networkId = Object.keys(networks)[0] as keyof typeof networks; // 5777

    const connectWallet = async () => {

    try {

        const currAccount = await window.ethereum!.request({method: "eth_requestAccounts"}) as any
        const currBalance = await web3.eth.getBalance(currAccount.toString());

        const formattedBalance = Web3.utils.fromWei(currBalance)

        setBalance(formattedBalance as any);
        
        chosenAccount = currAccount[0];
        accounts = currAccount[0];

        localStorage.setItem("account", accounts)
        localStorage.setItem("balance", formattedBalance);

        setAccounts(currAccount[0])

        balance = formattedBalance

    }
         
        catch(error: any) {


            return console.log(`Error : `, error);
            
        }
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

    const fetchNftData = async () => {

        try {

            const response = await axios.get(`http://localhost:5201/api/v1/nfts`);
            const data = response.data
            const tokenData = response.data.data;

            for(const data of tokenData) {
                console.log(data);
            }

            return tokenData;
        } 
        
        catch(error: any) {
            if(error) {
                return console.error(error);
            }
        }


    }


    const mintNft = async (name: string, price: number) => {

        const contractAbi = EventNftContract.abi;

        const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as unknown as any)
        const mintedNft = await nftContract.methods.mintNftToken(name, price).send({from: localStorage.getItem("account") as any});

        setTokenMinted(!tokenMinted)

        const nftValues = mintedNft.events.EventNftCreated.returnValues;

        const nftId = nftValues.id
        const nftName = nftValues.name;
        const nftPrice = nftValues.price

        const mintedNftData = {nftId, nftName, nftPrice}
        console.log(mintedNftData);

        return mintedNftData;
    }

    const setNftOnSale = async (id: number, price: number) => {

        try {
            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)
            const nftOnSale = await nftContract.methods.setNftOnSale(id, price).send({from: localStorage.getItem("account") as any});
    
            console.log(`Nft on sale `, nftOnSale);
    
            // Check to see if the ID is 0
    
            return nftOnSale;
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }


        }
    }

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
            console.log(nftData);

            return nftData
            
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }

        }
    }

    const fetchAllNftsOnSale = async () => {

        try {
            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)

            let listedNftsOnSale = await nftContract.methods.getNftTotalSupply().call()
            return listedNftsOnSale
        } 
        
        catch(error: any) {

        }
    }

    return <Web3Context.Provider value = {{connectWallet, handleAccountChange, accounts, balance, fetchNftData, mintNft, buyNft, setNftOnSale, fetchAllNftsOnSale}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}