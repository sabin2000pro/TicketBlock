import React, {useEffect, useState, useRef} from 'react'
import { Button } from "@chakra-ui/react";

type CreateNftProps = {
  
}

const CreateNft: React.FC = (props: any) => {
  const [tokenId, setTokenId] = useState<number | undefined>(0)
  const [name, setName] = useState<string | undefined>("")
  const [price, setPrice] = useState<string | undefined>("");

  const [tokenMinted, setTokenMinted] = useState<boolean | undefined>(false)

  const handleMintNft = async () => {
     try {

     } 
     
     catch(error: any) {
      if(error) {
        
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