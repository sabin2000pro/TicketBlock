import React, {useState, useEffect} from 'react'
import { ConnectWallet } from './ConnectWallet'

const NavBar: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = (): any => {
    try {

      return undefined;
    } 
    
    catch(error: any) {
      
      if(error) {
        return console.error(error);
      }
    }

  }


  return (
    <>
       <div>Navigation Bar</div>

       <ConnectWallet connectWallet ={connectWallet} walletConnected = {walletConnected} />

    </>
  )
}

export default NavBar