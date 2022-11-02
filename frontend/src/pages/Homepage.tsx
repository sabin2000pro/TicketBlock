import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Web3Context } from '../context/Web3Context'

const Homepage = () => {

    const {mintNft} = useContext(Web3Context);

    useEffect(() => {

    }, [])

    const mintNewToken = async () => {

      try {

        return await mintNft("Special New NFT", 650)
        
      } 
      
      catch(error: any) {

        if(error) {
            return console.log(error)
        }
      } 


    }



  return (

    <>

       <div className = "home-container">

          <div className = "cta-action">
             <h2 className = "heading-secondary">Event Ticket NFT Marketplace</h2>

             <p className = "cta-text">This is a decentralized web application where you can browse available event tickets in the form of NFTS to prevent fraudulent and fake event tickets from being resold and counterfeited. You must authenticate with your own account before you can mint any tickets </p>

          </div>

          <div className = "rectangle-box">

             <select>
                <option>1</option>
             </select>

             <button onClick = {() => mintNewToken()} >Test Mint NFT</button>



          </div>

          
       </div> 

       <section className = "info-section">

         <div className = "works-container">
            <h1 className = "heading-primary info-h">How It Works</h1>
         </div>
        
        </section>  


       
    </>
  )
}

export default Homepage