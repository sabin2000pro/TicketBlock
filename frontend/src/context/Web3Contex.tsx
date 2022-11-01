import { MetaMaskInpageProvider } from '@metamask/providers';
import React, {useContext, useState, useEffect, createContext, ReactNode} from 'react';
import Web3, { providers } from "ethers";
import { ethers } from 'ethersv5';

type Web3ContextProps = {
    children: ReactNode
}

export const defaultState = {
    ethereum: null,
    provider: null,
    isLoading: false
}

type Web3State = {
    web3Api: any
    getAccount: () => void
    getAccountBalance: () => void


}

type EthProvider = {
    ethereum: MetaMaskInpageProvider | null
    provider: providers.Web3Provider | null
}

export const createDefaultState = () => {
    return {ethereum: null, provider: null}
}

export const initialiseWeb3State = ({ethereum, provider}: any) => {
    return {ethereum, provider}
}

export const Web3Context = createContext<Web3State>(createDefaultState() as any)

export const Web3Provider = ({children}: Web3ContextProps) => {

    const [web3Api, setWeb3Api] = useState(defaultState)
    const [accounts, setAccounts] = useState("")
    const [balance, setBalance] = useState(0);

   useEffect(() => {

      try {

        const initialiseWeb3 = async () => {
          
            const globalEth = window.ethereum;
            const ethProvider = new ethers.providers.Web3Provider(globalEth as any)
            
            setWeb3Api(initialiseWeb3State({ethereum: globalEth, provider: ethProvider, isLoading: true}) as any)
           
          }

          initialiseWeb3();
    
      } 
      
      
      catch(error: any) {
       
      }
    
     
   }, [])

   const getAccountBalance = () => {
    
   }   

   const getAccount = () => {

   }
 
    return <Web3Context.Provider value = {{web3Api, getAccount, getAccountBalance}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}