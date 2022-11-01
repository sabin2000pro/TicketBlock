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

    processAccountChange: () => void
}

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [accounts, setAccounts] = useState<string | undefined>("")
    const [balance, setBalance] = useState<number | undefined>(0);

    const connectWallet = async () => {
        const provider = window.ethereum;
        const web3 = new Web3(provider as any)

        if(provider) {

            const web3provider = new ethers.providers.JsonRpcProvider("http://localhost:7545")    
            const currAccount = await window.ethereum?.request({method: "eth_requestAccounts"}) as any
    
            console.log(web3provider);
            setAccounts(currAccount as any)

            const currBalance = await web3.eth.getBalance("0xce7868dd6be1a4f0ba40267509f55fded1f14bea");
            const formattedBalance = Web3.utils.fromWei(currBalance)

            setBalance(formattedBalance as any);

            console.log(`Your balance : ${formattedBalance} ETH`)

        }

    }

    const processAccountChange = async () => {
        try {

        } 
        
        catch(error: any) {

        }


    }

    return <Web3Context.Provider value = {{connectWallet, accounts, balance, processAccountChange}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}