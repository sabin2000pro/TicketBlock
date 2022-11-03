import React, {useEffect, useState, useRef} from 'react'

type CreateNftProps = {
  
}

const CreateNft: React.FC = (props: any) => {
  const [tokenId, setTokenId] = useState<number | undefined>(0)
  const [name, setName] = useState<string | undefined>("")
  const [price, setPrice] = useState<string | undefined>("");

  const [tokenMinted, setTokenMinted] = useState<boolean | undefined>(false)

  return (

    <>

      <div className = "create--container">
         
      </div>

    </>


  )

  
}

export default CreateNft