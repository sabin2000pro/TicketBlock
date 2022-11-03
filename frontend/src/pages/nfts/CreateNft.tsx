import React, {useEffect, useState, useRef} from 'react'
import { Button } from "@chakra-ui/react";

type CreateNftProps = {
  
}

const CreateNft: React.FC = (props: any) => {
  const [tokenId, setTokenId] = useState<number | undefined>(0)
  const [name, setName] = useState<string | undefined>("")
  const [price, setPrice] = useState<string | undefined>("");

  const [tokenMinted, setTokenMinted] = useState<boolean | undefined>(false)

  return (

    <>
  <div className = "forgot-container">

<div className = "forgot-form">

 <form method = "POST">

 <h1 className = "heading-primary">Mint New NFT</h1>

     <div className = "email-container">

       <label htmlFor= "username">E-mail</label>
         <input type = "text" placeholder='E-mail Address'/>

     </div>

     <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Mint NFT</Button>

 </form>


</div>
</div>


    </>


  )


}

export default CreateNft