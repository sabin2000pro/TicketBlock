import { Grid, GridItem, Box, Badge } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button } from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"

type INftVals = {
  nfts: any[]
}

const NftList: React.FC<INftVals> = ({nfts}) => {
  const navigate = useNavigate();


  useEffect(() => {


   if(localStorage.getItem("token") === null) {

       alert("You must be logged in before viewing all NFTs");

       return navigate("/login")
   }

  }, [])

    return (

      <>

      <h1 className = "heading-primary nft-h"> NFTs For Sale </h1>
      
        {nfts.map((nft, key) => {

           return <Row key = {key} md = {2} xs = {1} lg = {3} className = "g-3">

           <Card className = "h-25 w-25 p-4 mx-5 mt-5">
           
               <Card.Body className = "d-flex flex-column custom">
           
               <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">
           
               <h3 style = {{fontSize: "28px"}}>{nft.name}</h3>

                 </Card.Title>
           
           
                 <Button className = "nft-btn" type = "submit" colorScheme='teal' size='md'>Add To Cart</Button>
                 </Card.Body>
           
                 </Card>

                 <Card className = "h-25 w-25 p-4 mx-5 mt-5">
           
           <Card.Body className = "d-flex flex-column custom">
       
           <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">
       
              <h3 style = {{fontSize: "28px"}}>{nft.name}</h3>
             </Card.Title>
       
             <Button className = "nft-btn" type = "submit" colorScheme='teal' size='md'>Add To Cart</Button>

             </Card.Body>
       
             </Card>


             <Card className = "h-25 w-25 p-4 mx-5 mt-5">
           
           <Card.Body className = "d-flex flex-column custom">
       
           <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">
       
           <h3 style = {{fontSize: "20px"}}>{nft.name}</h3>
            

             </Card.Title>
       
             <div className = "nft-price">
               <p style = {{padding: "10px", display: 'block', fontWeight: 'bold'}}>Price: {nft.price}</p>
             </div>

             <Button className = "nft-btn" type = "submit" colorScheme='teal' size='md'>Add To Cart</Button>

       
             </Card.Body>
       
             </Card>
           
                </Row>
        })}

        
      </>

      
    )

  }


export default NftList
