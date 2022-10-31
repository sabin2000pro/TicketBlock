/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@chakra-ui/react';
import { MetaMaskInpageProvider } from "@metamask/providers";
import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window{

    ethereum?: MetaMaskInpageProvider

  }
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean | undefined>(false);
  const [accounts, setAccounts] = useState<[]>([]);
  const [balance, setBalance] = useState<string | undefined>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [tokenPresent, setTokenPresent] = useState<boolean | undefined>(false);

  const handleWalletConnect = async (event: any) => {

     try {

      event.preventDefault();

      const accounts = await window.ethereum?.request({method: "eth_requestAccounts"}) as any
      const web3 = new Web3(window.ethereum as any);
      const currentBalance = await web3.eth.getBalance(accounts[0]); // Get the account balance
    
      setIsWalletConnected(!isWalletConnected);
      setAccounts(accounts)
      setBalance(currentBalance);

      localStorage.setItem("address", JSON.stringify(accounts));
      setTokenPresent(true);
      
     } 
     
     catch(err : any) {

      if(err) {
        return console.log(err);
      }

     }

  } 

  const logoutHandler = async (event: any) => {
    // Clear the session by sending GET request to logout to the backend
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
               <a href = "/profile"> <li className = "link">My Profile</li></a>
               <a href = "/cart"> <li className = "link">Cart</li></a>

       </ul>

       {!isWalletConnected ? <Button onClick = {handleWalletConnect} className = "wallet-btn" colorScheme='teal' size='md'> Connect Wallet </Button> : <h2 style = {{color: 'white', textAlign: 'center', marginTop: '25px', marginRight: '25px'}}>Account Balance: {balance} ETH</h2> }
      

</nav> 
      </div>


    
  </>

  )}

export default NavBar;