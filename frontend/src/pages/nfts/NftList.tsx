import React, {FormEvent, useContext, useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button, Badge } from "@chakra-ui/react"
import {useNavigate, useParams} from "react-router-dom"
import { Web3Context } from '../../context/Web3Context'
import ethlogo from '../../images/ethlogo.png';
import axios from 'axios'

type INftVals = {
  nfts: any[]
}

const NftList: React.FC<INftVals> = ({nfts}) => {
  
  const navigate = useNavigate();
  const {id} = useParams();
  let {fetchNftData, buyNft} = useContext(Web3Context)

  const [isError, setIsError] = useState<boolean | false>(false);
  const [tokenPurchased, setTokenPurchased] = useState<boolean | undefined>(false)
  let [boughtToken, setBoughtToken] = useState<number | undefined>(0);

  const [chosenFile, setChosenFile] = useState<string | undefined>("");
  const [fileSelected, setFileSelected] = useState<boolean | undefined>(false);

  useEffect(() => {

   if(localStorage.getItem("token") === null) {
       alert("You must be logged in before viewing all NFTs");
       return navigate("/login")
   }

  }, [])

  useEffect(() => {

    const getAllNfts = async () => {

     await fetchNftData();
    
    }

   getAllNfts();

  }, [])

  const onFileChangeHandler = async (event: any) => {

     try {

       setChosenFile(event.target.files[0]);
       setFileSelected(!fileSelected);

     } 
     
     catch(err: any) {

       if(err) {
        return console.error(err);
       }


     }  


  } 

  const handleFileUpload = async (tokenId: number) => {

    try {

      console.log(`Uploading Image for token : `, tokenId);

      const newFileData = new FormData() as any;
      newFileData.append("File", chosenFile);

      const fileUploadResponse = await axios.post(`http://http://localhost:5299/api/v1/nfts/upload/${tokenId}`, {newFileData});

    } 
    
    catch(error: any) {

    }
     
  }

  const buyTokenHandler = async (id: number) => {

     try {

        const nft = nfts.find(theNft => theNft.tokenId === id);
        boughtToken = nft;
        await buyNft(nft.tokenId)

        setBoughtToken(boughtToken);
        console.log(`Bought token : `, boughtToken);

        setTokenPurchased(!tokenPurchased);
     } 
     
     catch(error: any) {

       if(error) {

         setIsError(!isError);
         return console.error(error);

       }

     }

  }

    return (

      <>

      <h1 className = "heading-primary nft-h"> Tokens For Sale </h1>

        {nfts.map((nft, key) => {

      return (
  
      <Row key = {key} md = {2} xs = {1} lg = {3} className = "g-1 d-inline-flex m-4">

      <Card className = "h-50 w-100 m-3 mx-2 mt-5 d-flex">

          <Card.Body className = "d-flex flex-column custom m-4 w-100">

          <div className = "nft-image-container">
              {tokenPurchased ? <Badge colorScheme='green'>NFT Purchased</Badge> : <span>NFT Image</span>}
            </div>
          

          <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

            <p style = {{marginLeft: "100px", marginTop: "15px", fontSize: "20px", marginBottom: "40px"}}>{nft.name}</p>
          
            </Card.Title>
    
             {tokenPurchased ? <span>New Owner: {localStorage.getItem("account")} </span> : <span>Creator: {nft.creator}  </span>}

            <span>Token ID : {nft.tokenId}</span>
           
            <div className = "price-container">
                <p>Price:  <strong>  {nft.price}  ETH</strong>   </p>
            </div>

            <div className = "logo-container">
              <img style = {{height: '35px', marginLeft: '330px', marginRight: '-20px', marginTop: "-30px", marginBottom: "20px"}} src = {ethlogo} alt = "ethlogo" />
            </div>

            <Button disabled = {tokenPurchased} onClick = {() => buyTokenHandler(nft.tokenId)} className = "nft-btn w-150 custom-btn" type = "submit" colorScheme='teal' size='md'>Buy NFT</Button>


          <div className = "file-container">
            <input type = "file" name = "file" onChange = {onFileChangeHandler} />

          </div>

            <Button onClick = {() => handleFileUpload(nft.tokenId) }  className = "nft-btn w-150 custom-btn" type = "submit" colorScheme='teal' size='md'>Upload Image</Button>

        </Card.Body>

            </Card>

       </Row>

      )
  
          
      })}
        
      </>

      
    )

  }


export default NftList