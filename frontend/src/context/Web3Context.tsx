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
}

type IProviders = {
    ethereum: MetaMaskInpageProvider
    provider: providers.Web3Provider
}

const web3provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")  

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");

    const connectWallet = async () => {

        const provider = window.ethereum;
        const web3 = new Web3(provider as any)

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
        })


    }

    const fetchOwnedNfts = async () => {

    }

    const mintNft = async () => {

    }

    const fetchAllNftsOnSale = async () => {

    }

    return <Web3Context.Provider value = {{connectWallet, handleAccountChange, accounts, balance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}