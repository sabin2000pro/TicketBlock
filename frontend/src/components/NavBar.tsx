/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@chakra-ui/react';
import { MetaMaskInpageProvider } from "@metamask/providers";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useContext} from "react";
import { Web3Context } from '../context/Web3Context';

declare global {
  interface Window{

    ethereum?: MetaMaskInpageProvider

  }
}

const NavBar: React.FC = () => {

  const navigate = useNavigate();
  
  const {connectWallet, accounts} = useContext(Web3Context);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean | undefined>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [tokenPresent, setTokenPresent] = useState<boolean | undefined>(false);

  const handleWalletConnect =  (event: any) => {

     try {

      event.preventDefault();

      connectWallet();

      setIsWalletConnected(!isWalletConnected)
      
     } 
     
     catch(err : any) {

      if(err) {
        return console.log(err);
      }

     }

  } 

  const logoutHandler = async (event: any) => {

    try {

       event.preventDefault()
       localStorage.removeItem("token");

       setIsLoggedIn(false);
       setTokenPresent(false);

       return navigate("/login");
       
    } 
    
    catch(error: any) {
     
     if(error) {

       return console.error(error);
     }
    }


 }

  useEffect(() => {

    const fetchAuthToken = () => {

       const token = localStorage.getItem("token");

       if(token === null) {
          setTokenPresent(false);
          setIsLoggedIn(false);
       }

       if(token !== null) {
          setTokenPresent(!tokenPresent) as unknown as boolean;
          setIsLoggedIn(!isLoggedIn) as unknown as boolean;
       }
       
    }

    fetchAuthToken();
 }, [])


  return (

   <>

      <div className = "nav-container">

          <nav className = "nav">

             <ul className = "links-container">

               <a href = "/nfts"> <li className = "link">Ticket Block</li></a>

               <a href = "/register"> <li className = "link">Register</li></a>
    {tokenPresent && isLoggedIn ? <a onClick = {logoutHandler} href = "/login"> <li className = "link"> Logout </li> </a> : 
      
      !tokenPresent && !isLoggedIn &&

    <a href = "/login"> <li className = "link"> Login </li> </a>  }
    
               <a href = "/create-nft"> <li className = "link">Create NFT</li></a>
               {tokenPresent && isLoggedIn && <a href = "/profile"> <li className = "link">My Profile</li></a>}
               <a href = "/cart"> <li className = "link">Cart</li></a>


               <div className = "cart-container">
                  <span className='cart-qty'>0</span>
               </div>

               <div className='search-container'>
                  <input placeholder='Search NFT' type = "text" />
               </div>

       </ul>

       {!isWalletConnected && isLoggedIn && tokenPresent ? <Button onClick = {handleWalletConnect} className = "wallet-btn" colorScheme='teal' size='md'> Connect Wallet </Button> : undefined }
       {isWalletConnected && <h2 style = {{color: 'white', textAlign: 'center', marginTop: '25px', marginRight: '25px'}}>Account: {accounts}</h2>}
      

</nav> 
      </div>


    
  </>

  )}

export default NavBar;