import React from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'

const VerifyInput: React.FC= (props: any) => {

  return (

    <>

    <PinInput size = "lg">
        <PinInputField padding = "3" marginRight={8}/>
        <PinInputField padding = "3" marginRight={8}/>

        <PinInputField padding = "3" marginRight={8}/>
        <PinInputField padding = "3" marginRight={8}/>
        <PinInputField padding = "3" marginRight={8}/>
        <PinInputField padding = "3" marginRight={8}/>
</PinInput>


    </>


  )
}

export default VerifyInput