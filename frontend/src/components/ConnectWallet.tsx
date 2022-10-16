import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers';
import { useAuth } from '../pages/authentication/context/AuthContext';

// Load the Ganache Environment

type ConnectWalletProps = {
  connectWallet: () => Promise<any>
  walletConnected: Boolean
}

// Component used to connect the meta mask wallet.
// @props: Conenct Wallet Function. Rendered from Navigation Bar && Wallet Connected determines if the meta mask wallet is connected or not
const ConnectWallet: React.FC<ConnectWalletProps> = ({connectWallet, walletConnected}) => {
  const [account, setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const {authContext} = useAuth();

  useEffect(() => {
    
    if(!walletConnected) {
       connectWallet();
    }

  }, [])

  return (

    <>

    </>
  )
}

export {ConnectWallet}