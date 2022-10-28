import { Button } from '@chakra-ui/react';
import React from 'react';

const NavBar: React.FC = () => {

  const handleWalletConnect = (event: any) => {
    event.preventDefault();
    console.log('Connecting ETH wallet')

  } 

  return (

   <>

      <div className = "nav-container">

          <nav className = "nav">

             <ul className = "links-container">

               <a href = "/nfts"> <li className = "link">Ticket Block</li></a>

               <a href = "/register"> <li className = "link">Register</li></a>
               <a href = "/login"> <li className = "link">Login</li></a>
               <a href = "/create-nft"> <li className = "link">Create NFT</li></a>
               <a href = "/profile"> <li className = "link">My Profile</li></a>
               <a href = "/cart"> <li className = "link">Cart</li></a>

       </ul>

       <Button className = "wallet-btn" colorScheme='teal' size='md'> Connect Wallet</Button>
    </nav>
       

         
      </div>


    
  </>

  )}

export default NavBar;