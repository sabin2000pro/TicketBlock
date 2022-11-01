import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    initialiseWeb3Provider: () => void,
    connectWallet: () => void
    getAccountBalance: () => number
}

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [account, setAccount] = useState<string | undefined>("")
    const [balance, setBalance] = useState<number | undefined>(0);

    const initialiseWeb3Provider = () => {
       const globalEth = window.ethereum;
       const web3 = new Web3(globalEth as any);
    }

    const connectWallet = async () => {
        const provider = window.ethereum;

        const accounts = await provider?.request({method: "eth_requestAccounts"});
        setAccount(accounts as any)

        console.log(`Accounts : ${accounts}`)
       
    }

    const getAccountBalance = () => {
        return 0;
    }

    return <Web3Context.Provider value = {{initialiseWeb3Provider, connectWallet, getAccountBalance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}