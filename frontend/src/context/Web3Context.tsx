import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers } from 'ethers';
import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    accounts: any,
    balance: any,
    connectWallet: () => void
}

type ISwitchAccount = {
    ethereum: MetaMaskInpageProvider
}

const web3provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")  

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    const [balance, setBalance] = useState<number | undefined>(0);

    const connectWallet = async () => {

        const provider = window.ethereum;
        const web3 = new Web3(provider as any)

        if(provider) {

            const currAccount = await window.ethereum!.request({method: "eth_requestAccounts"}) as any

            setAccounts(currAccount[0])
            accounts = currAccount[0];

            const currBalance = await web3.eth.getBalance(currAccount.toString());
            const formattedBalance = Web3.utils.fromWei(currBalance)

            setBalance(formattedBalance as any);

            localStorage.setItem("account", accounts)

        }

    }

    return <Web3Context.Provider value = {{connectWallet, accounts, balance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}