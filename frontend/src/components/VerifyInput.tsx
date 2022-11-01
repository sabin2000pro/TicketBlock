import React from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'

type IVerifyInput = {
  otp: any[]
  otpIndex: number | undefined
}

const VerifyInput: React.FC<IVerifyInput> = ({otp, otpIndex}) => {

  return (

    <>

     {otp.map((_, indexVal) => {

        return  <PinInput key = {indexVal} defaultValue = {otp[indexVal] || ""} size = "lg">
      
        <PinInputField padding = "3" marginRight={8}/>
        
  </PinInput>
     })}


    </>


  )
}

export default VerifyInput