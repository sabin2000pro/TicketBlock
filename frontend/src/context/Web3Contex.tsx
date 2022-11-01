import {useContext, useState, createContext, ReactNode} from 'react';
import { providers } from 'ethersv5';
import Web3 from 'web3';
import { MetaMaskInpageProvider } from '@metamask/providers';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    initialiseWeb3Provider: () => void,
    connectWallet: () => void
    getAccount : () => void
    getAccountBalance: () => Number
}

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [account, setAccount] = useState<string>("")
    const [balance, setBalance] = useState(0);

    const initialiseWeb3Provider = () => {
       const globalEth = window.ethereum;
    }

    const connectWallet = () => {
        const provider = window.ethereum;

        provider?.request({method: "eth_requestAccounts"}).then(acc => {
             console.log(acc);
        })

       
    }

    const getAccount = () => {

    }

    const getAccountBalance = () => {
        return 0;
    }

    return <Web3Context.Provider value = {{initialiseWeb3Provider, connectWallet, getAccount, getAccountBalance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}