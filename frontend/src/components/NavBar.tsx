/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@chakra-ui/react';
import { MetaMaskInpageProvider } from "@metamask/providers";
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';
import logo from '../images/ticket.png';

declare global {
  interface Window{

    ethereum?: MetaMaskInpageProvider

  }
}

const NavBar: React.FC = () => {

  const navigate = useNavigate();
  
  let {connectWallet, accounts} = useContext(Web3Context);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean | undefined>(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [tokenPresent, setTokenPresent] = useState<boolean | undefined>(false);

  const [accountAddress, setAccountAddress] = useState("");
  const [accountAddressPresent, setAccountAddressPresent] = useState(false);

  const handleWalletConnect = (event: any) => {

     try {

      event.preventDefault();

      connectWallet();

      const accountAddress = localStorage.getItem("account");
      accounts = accountAddress;

      setAccountAddress(accounts);
      setIsWalletConnected(!isWalletConnected)

      setTimeout(() => {
         window.location.reload()
      }, 1500)

     } 
     
     catch(err : any) {

      if(err) {
        return console.log(err);
      }

     }

  } 

  useEffect(() => {

    const fetchAccountAddress = () => {

       const accountAddress = localStorage.getItem("account");

       if(accountAddress !== null) {
        
         setAccountAddress(accountAddress as any)
         setAccountAddressPresent(true);
         setIsWalletConnected(true)
       }


    }

    fetchAccountAddress();


  }, [])

  const logoutHandler = async (event: any) => {

    try {

       event.preventDefault()

       localStorage.removeItem("token");
       localStorage.removeItem("account")

       setIsLoggedIn(false);
       setTokenPresent(false);

       setIsWalletConnected(false)
       setAccountAddressPresent(false)

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

 const handleLogoClick = () => {
   return navigate('/')
 }


  return (

   <>

      <div className = "nav-container">

          <nav className = "nav">

             <ul className = "links-container">

             <img onClick ={handleLogoClick} src = {logo} className = "img-logo" alt = "logo" />

               <a href = "/register"> <li className = "link">Register</li></a>


    {tokenPresent && isLoggedIn ? <a onClick = {logoutHandler} href = "/login"> <li className = "link"> Logout </li> </a> : 
      
      !tokenPresent && !isLoggedIn &&

    <a href = "/login"> <li className = "link"> Login </li> </a>  }
    
               {tokenPresent && isLoggedIn && <a href = "/create-nft"> <li className = "link">Mint NFT</li></a>}
               {tokenPresent && isLoggedIn && <a href = "/profile"> <li className = "link">My Profile</li></a>}


               <div className='search-container'>
                   <input placeholder='Search NFT' type = "text" />
               </div>

       </ul>

       {!isWalletConnected && isLoggedIn && tokenPresent ? <Button onClick = {handleWalletConnect} className = "wallet-btn" colorScheme='teal' size='md'> Connect Wallet </Button> : accountAddressPresent && <h2 style = {{color: 'white', textAlign: 'center', marginTop: '25px', marginRight: '25px'}}> Account: {accountAddress}</h2>}
      

</nav> 
      </div>


    
  </>

  )}

export default NavBar;