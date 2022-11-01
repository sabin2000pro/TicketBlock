import React, { useEffect, useState } from 'react'
import { useAuth } from '../pages/authentication/context/AuthContext';

// Load the Ganache Environment

type ConnectWalletProps = {
  connectWallet: () => Promise<any>
  walletConnected: Boolean
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({connectWallet, walletConnected}) => {


  return (

    <>

    </>
  )
}

export {ConnectWallet}