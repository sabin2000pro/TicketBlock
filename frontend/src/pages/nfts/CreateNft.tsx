import React, {useState, useContext} from 'react'
import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { Web3Context } from '../../context/Web3Context';

const CreateNft: React.FC = () => {
  let [tokenId, setTokenId] = useState<string | undefined>("")
  let [name, setName] = useState<string | undefined>("")
  let [price, setPrice] = useState<string | undefined>("");

  const [tokenMinted, setTokenMinted] = useState<boolean | undefined>(false)
  const [mintError, setMintError] = useState<string | undefined>("");
  let [tokensMinted, setTokensMinted] = useState<number | undefined>(0)

  const {mintNft} = useContext(Web3Context);

  const handleMintNft = async (event: any): Promise<any | undefined> => {

     try {
      
      event.preventDefault();

      setTokenId(tokenId);
      setName(name);
      setPrice(price);

      // Invoke routine to mint the token that will automatically send the data to the DB by sending POST request

      await mintNft(name as any, price as any);

      setTokenMinted(!tokenMinted);
      setTokensMinted((tokensMinted) => tokensMinted! + 1);

      setTokenId("")
      setName("");
      setPrice("");

     } 
     
     catch(error: any) {


      if(error) {
        setMintError("");
        setTokenMinted(false);
      }


     }


  }

  return (

    <>

    {mintError && <Alert status='error'>

      <AlertIcon />
            There was a problem minting your NFT
      </Alert>}


    {tokenMinted && <Alert status='success'>

      <AlertIcon />
          Token Minted Successfully
      </Alert>}


  <div className = "forgot-container">

<div className = "forgot-form">

 <form onSubmit = {handleMintNft} method = "POST">

 <h1 className = "heading-primary">Mint Token</h1>

     <div className = "email-container">

       <label htmlFor= "tokenId">ID</label>

         <input value = {tokenId} onChange = {(event) => setTokenId(event.target.value)} type = "text" placeholder ='Token ID'/>

     </div>

     <div className = "password-container">
                <label className = "password-lbl" htmlFor= "password">Name</label>
                <input value = {name} onChange = {(event) => setName(event.target.value)} type = "text" placeholder = 'Token Name'/>
       </div>
     

       <div className = "password-container">
              <label className = "password-lbl" htmlFor= "password">Price</label>
              <input value = {price} onChange = {(event) => setPrice(event.target.value)} type = "text" placeholder = 'Token Price'/>
       </div>

     <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Mint Event Ticket</Button>

 </form>


</div>



</div>


    </>


  )


}

export default CreateNft