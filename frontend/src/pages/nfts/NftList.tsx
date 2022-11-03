import { Grid, GridItem, Box, Badge } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"

type INftVals = {

}

const NftList: React.FC<INftVals> = (props: any) => {
  const navigate = useNavigate();
  const [nfts, setNfts] = useState<any[]>([]);
  const [nftsRendered, setNftsRendered] = useState<boolean | undefined>();

  useEffect(() => {

   if(localStorage.getItem("token") === null) {
       alert("You must be logged in before viewing all NFTs");

       return navigate("/login")
   }

  }, [])

    return (

      <>
      

        <div className = "nft-container">
          <h1 className = "heading-primary heading-2">NFTs On Sale</h1>
        </div>


        
      </>

      
    )

  }


export default NftList
