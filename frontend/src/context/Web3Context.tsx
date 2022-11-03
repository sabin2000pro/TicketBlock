import { ethers } from 'ethers';
import {useContext, useState, createContext, ReactNode, useEffect} from 'react';
import Web3 from 'web3';
import EventNftContract from '../contracts/EventNftMarket.json';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    accounts: any,
    balance: any,
    connectWallet: () => void
    handleAccountChange: () => void

    mintNft: (name: string, price: number) => void
    buyNft: (id: number) => void
}

const provider = window.ethereum;
const web3 = new Web3(provider as any)
let chosenAccount;

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");
    let [accountChanged, setAccountChanged] = useState<boolean | undefined>(false);
    let [ownedNfts, setOwnedNfts] = useState<any[] | undefined>([]);

    const [tokenMinted, setTokenMinted] = useState<boolean | false>(false)
    const [nftsOnSale, setNftsOnSale] = useState<any[] | undefined>([])

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

    const mintNft = async (name: string, price: number) => {

        const contractAbi = EventNftContract.abi;

        const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as unknown as any)
        const mintedNft = await nftContract.methods.mintNftToken(name, price).send({from: localStorage.getItem("account") as any});

        setTokenMinted(!tokenMinted)

        const nftValues = mintedNft.events.EventNftCreated.returnValues;
        const tokenId = nftValues.id;
        const tokenPrice = nftValues.price;       

        setNftOnSale(tokenId, tokenPrice); // Place the token now on sale

        return mintedNft;
    }

    const setNftOnSale = async (id: number, price: number) => {
      
        const contractAbi = EventNftContract.abi;
        const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)
        const nftOnSale = await nftContract.methods.setNftOnSale(id, price).send({from: localStorage.getItem("account") as any});

        buyNft(id);

        return nftOnSale;
    }

    const buyNft = async (id: number) => {

        try {
            const contractAbi = EventNftContract.abi;
            const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks[networkId].address as any)
            const boughtNft = await nftContract.methods.buyNft(id).send({from: localStorage.getItem("account") as any});

            const nftValues = boughtNft.events.NftPurchased.returnValues
            console.log(nftValues);

            setOwnedNfts(boughtNft);
            ownedNfts!.push(boughtNft) as any

            for(const vals of ownedNfts as any) {
                console.log(`Your Owned NFTs : `, vals);
            }

    
        } 
        
        catch(error: any) {

            if(error) {
                return console.error(error);
            }

        }


    }

    return <Web3Context.Provider value = {{connectWallet, handleAccountChange, accounts, balance, mintNft, buyNft}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}