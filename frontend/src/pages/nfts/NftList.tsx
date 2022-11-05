import React, {useContext, useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button } from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"
import { Web3Context } from '../../context/Web3Context'
import { Badge } from '@chakra-ui/react'
import ethlogo from '../../images/ethlogo.png';

type INftVals = {
  nfts: any[]
}

const NftList: React.FC<INftVals> = ({nfts}) => {
  const navigate = useNavigate();
  let {fetchNftData, buyNft} = useContext(Web3Context)

  const [isError, setIsError] = useState<boolean | false>(false);

  const [tokenPurchased, setTokenPurchased] = useState<boolean | undefined>(false)

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

  useEffect(() => {
    console.log(localStorage.getItem("nftowner"))
  }, [])

  const addToCartHandler = async (id: number) => {

     try {
        await buyNft(id)
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

      <h1 className = "heading-primary nft-h"> NFTs For Sale </h1>
      
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

            <Button disabled = {tokenPurchased} onClick = {() => addToCartHandler(nft.tokenId)} className = "nft-btn w-150 custom-btn" type = "submit" colorScheme='teal' size='md'>Buy NFT</Button>

        </Card.Body>

            </Card>

       </Row>

      )
  
          
      })}
        
      </>

      
    )

  }


export default NftList