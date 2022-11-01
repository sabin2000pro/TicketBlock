import { MetaMaskInpageProvider } from '@metamask/providers';
import React, {useContext, useState, useEffect, createContext, ReactNode} from 'react';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    
    handleFetchAccount: () => void
    handleSwitchAccounts: () => void
}

export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    const [ethereum, setEthereum] = useState(null);

    const handleFetchAccount = () => {

    }

    const handleSwitchAccounts = () => {

    }
 
    return <Web3Context.Provider value = {{handleFetchAccount, handleSwitchAccounts}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}