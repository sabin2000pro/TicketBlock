import {useContext, useState, useEffect, createContext, ReactNode} from 'react';
import { providers } from 'ethersv5';
import Web3 from 'web3';
import { MetaMaskInpageProvider } from '@metamask/providers';

type Web3ContextProps = {
    children: ReactNode
}

type Web3Provider = {
    ethereum: MetaMaskInpageProvider
    provider: providers.Web3Provider
}

type Web3Functions = {
    connectWallet: () => void
    getAccount : () => void
}

export const Web3Context = createContext({} as Web3Functions)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [account, setAccount] = useState<string | undefined>("")
    const [balance, setBalance] = useState(0);

    const initialiseWeb3Provider = () => {
        const provider = window.ethereum
    }

    const connectWallet = () => {
        
    }

    const getAccount = () => {

    }

    return <Web3Context.Provider value = {{connectWallet, getAccount}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}