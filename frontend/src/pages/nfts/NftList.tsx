import { Grid, GridItem, Box, Badge } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'

type INftVals = {

}

const NftList: React.FC<INftVals> = (props: any) => {


  useEffect(() => {
    // Check to see if the user is logged in
  }, [])

    return (

      <>
        <div className = "nft-container">
          <h1 className = "heading-primary heading-2">All NFTs here</h1>
        </div>
      </>

      
    )

  }


export default NftList
