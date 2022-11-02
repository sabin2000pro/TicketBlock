import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers, providers } from 'ethers';
import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    accounts: any,
    balance: any,
    connectWallet: () => void
    handleAccountChange: () => void

    fetchOwnedNfts: () => void
    mintNft: (name: string, price: number) => void
    fetchAllNftsOnSale: (nfts: any) => void
}

const provider = window.ethereum;
const web3 = new Web3(provider as any)

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");
    let [accountChanged, setAccountChanged] = useState<boolean | undefined>(false);
    const [nfts, setNfts] = useState([])

    const connectWallet = async () => {

        if(provider) {

            const currAccount = await window.ethereum!.request({method: "eth_requestAccounts"}) as any
            accounts = currAccount[0];

            const currBalance = await web3.eth.getBalance(currAccount.toString());
            const formattedBalance = Web3.utils.fromWei(currBalance)

            setBalance(formattedBalance as any);
            setAccounts(currAccount[0])

            localStorage.setItem("account", accounts)
            localStorage.setItem("balance", formattedBalance);
            balance = formattedBalance

        }

    }

    const handleAccountChange = () => {

        window.ethereum?.on("accountsChanged", (accounts) => {
            
             console.log(accounts);

             setAccountChanged(!accountChanged);
        })

    }

    const fetchOwnedNfts = async () => {

    }

    const mintNft = async (name: string, price: number) => {
        const networkId = await web3.eth.net.getId();

    }

    const fetchAllNftsOnSale = async (nfts: any) => {
        return nfts;
    }

    return <Web3Context.Provider value = {{connectWallet, handleAccountChange, accounts, balance, mintNft, fetchAllNftsOnSale, fetchOwnedNfts}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}