import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
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

    const connectWallet = async () => {
        console.log("Connecting wallet..")
        const provider = window.ethereum;

        const accounts = await window.ethereum?.request({method: "eth_requestAccounts"}) as any
        const web3 = new Web3(provider as any);

        setAccounts(accounts)
        const currentBalance = await web3.eth.getBalance(accounts); // Get the account balance

        console.log(`Accounts : ${accounts}`)
        console.log(currentBalance);

    }

    const getAccountBalance = () => {
        return 0;
    }

    return <Web3Context.Provider value = {{connectWallet, getAccountBalance, tokenPresent, accounts, balance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}