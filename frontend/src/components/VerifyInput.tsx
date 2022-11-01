import React from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'

const VerifyInput = (props: any) => {


  return (

    <>
    <PinInput otp size = "lg">
        <PinInputField color= "white" size={2} padding = "8" marginRight={8}/>
        <PinInputField size={2} padding = "8" marginRight={8} />
        <PinInputField size={2} padding = "8" marginRight={8} />
        <PinInputField size={2} padding = "8" marginRight={8} />
        <PinInputField size={2} padding = "8" marginRight={8} />
        <PinInputField  size={2} padding = "8" marginRight={8} />
</PinInput>


    </>


  )
}

export default VerifyInput