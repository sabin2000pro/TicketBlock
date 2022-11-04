import React, {useContext, useEffect} from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button } from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"
import { Web3Context } from '../../context/Web3Context'
import ethlogo from '../../images/ethlogo.png';

type INftVals = {
  nfts: any[]
}

const NftList: React.FC<INftVals> = ({nfts}) => {
  const navigate = useNavigate();
  const {fetchNftData} = useContext(Web3Context)

  useEffect(() => {

   if(localStorage.getItem("token") === null) {

       alert("You must be logged in before viewing all NFTs");

       return navigate("/login")
   }

  }, [])

  useEffect(() => {

    const getAllNfts = async () => {


    return await fetchNftData();

    }

   getAllNfts();


  }, [])

    return (

      <>

      <h1 className = "heading-primary nft-h"> NFTs For Sale </h1>
      
        {nfts.map((nft, key) => {

      return (
  
      <Row key = {key} md = {2} xs = {1} lg = {3} className = "g-3 d-inline-flex m-3">

      <Card className = "h-50 w-100 m-3 mx-5 mt-5 d-flex">


          <Card.Body className = "d-flex flex-column custom m-4 w-75">


          <div className = "nft-image-container">
               <h3>Image here</h3>
            </div>
          

          <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

            <p style = {{marginLeft: "80px", marginTop: "30px", fontSize: "18px", marginBottom: "30px"}}>{nft.name}</p>

            </Card.Title>

            <div className = "price-container">
                <p>Price:  <strong>  {nft.price}  ETH</strong>   </p>
            </div>


            <div className = "logo-container">
              <img style = {{height: '35px', marginLeft: '260px', marginRight: '-20px', marginTop: "-30px", marginBottom: "20px"}} src = {ethlogo} alt = "ethlogo" />
            </div>

            <Button className = "nft-btn w-150 custom-btn" type = "submit" colorScheme='teal' size='md'>Add To Cart</Button>


            </Card.Body>

            </Card>

        



          </Row>

       

      )
  
          
      })}
        
      </>

      
    )

  }


export default NftList
