import React, {useEffect, useState, useRef, useContext} from 'react'
import { Button } from "@chakra-ui/react";
import { Web3Context } from '../../context/Web3Context';

type CreateNftProps = {
  
}

let DEFAULT_TOKEN_ID = 0 as number;

const CreateNft: React.FC = (props: any) => {
  const [tokenId, setTokenId] = useState<number | undefined>(DEFAULT_TOKEN_ID)
  const [name, setName] = useState<string | undefined>("")
  const [price, setPrice] = useState<string | undefined>("");

  const [tokenMinted, setTokenMinted] = useState<boolean | undefined>(false)
  const [mintError, setMintError] = useState<string | undefined>("");

  const {mintNft} = useContext(Web3Context);

  const handleMintNft = async (): Promise<any | undefined> => {
     try {

      setTokenId(tokenId);
      setName(name);
      setPrice(price);


      // Invoke routine to mint the token that will automatically send the data to the DB by sending POST request

      return await mintNft(name as any, price as any);

     } 
     
     catch(error: any) {


      if(error) {
        console.log(error);
        setMintError("");
        setTokenMinted(false);
      }


     }


  }

  return (

    <>
  <div className = "forgot-container">

<div className = "forgot-form">

 <form onSubmit = {handleMintNft} method = "POST">

 <h1 className = "heading-primary">Mint New NFT</h1>

     <div className = "email-container">

       <label htmlFor= "username">Token ID</label>
         <input value = {tokenId} onChange = {(event) => setTokenId(parseInt(event.target.value))} type = "text" placeholder ='Token ID'/>

     </div>

     <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Mint NFT</Button>

 </form>


</div>
</div>


    </>


  )


}

export default CreateNft