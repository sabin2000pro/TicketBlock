import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    initialiseWeb3Provider: () => void,
    accounts: any,
    balance: any,
    tokenPresent: boolean,
    connectWallet: () => void
    getAccountBalance: () => number
}

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [accounts, setAccounts] = useState<string | undefined>("")
    const [balance, setBalance] = useState<number | undefined>(0);

    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [tokenPresent, setTokenPresent] = useState(false);

    const initialiseWeb3Provider = () => {
       const globalEth = window.ethereum;
       const web3 = new Web3(globalEth as any);
    }

    const connectWallet = async () => {
        const provider = window.ethereum;

        const accounts = await window.ethereum?.request({method: "eth_requestAccounts"}) as any
        const web3 = new Web3(provider as any);

        setAccounts(accounts[0] as any)
        const currentBalance = await web3.eth.getBalance(accounts[0]); // Get the account balance
      
        setIsWalletConnected(!isWalletConnected);
        setAccounts(accounts);
  
        localStorage.setItem("address", JSON.stringify(accounts));
        setTokenPresent(!tokenPresent);
       
    }

    const getAccountBalance = () => {
        return 0;
    }

    return <Web3Context.Provider value = {{initialiseWeb3Provider, connectWallet, getAccountBalance, tokenPresent, accounts, balance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}