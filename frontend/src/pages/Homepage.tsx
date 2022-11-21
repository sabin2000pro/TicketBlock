import React from 'react'
import ethereum from '../images/ethereum.jpg';

const Homepage = () => {

   
  return (

    <>

       <div className = "home-container">

          <div className = "cta-action">

             <h2 className = "heading-secondary heading-other">Event Ticket NFT Marketplace</h2>

             <p className = "cta-text">A decentralized blockchain based web application where you can mint your own event ticket NFT to prevent fraudulent activity </p>

               <div className = "btn-container">
                 <button className = "cta-btn">Get Started</button>
               
               </div>

          </div>

           <div className = "img-container">
              <img className = "eth-img" src = {ethereum} alt = "Eth Image" />
           </div>

      
       </div> 

  
    </>

    
  )
}

export default Homepage