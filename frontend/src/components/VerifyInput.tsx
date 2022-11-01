import React, {useState, useRef} from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'

type IVerifyInput = {
  otp: any[]
  moveNextOtpField: (currentOtpIndex: any) => void
  activeOtpIndex: any,
  setActiveOtpIndex: () => void
}

const VerifyInput: React.FC<IVerifyInput> = ({otp, activeOtpIndex, setActiveOtpIndex, moveNextOtpField}) => {
  const inputRef = useRef();

  const handleNextOTP = (event: any) => {
     event.preventDefault();
     console.log("Handle OTP change")


  }

  return (

    <>

     {otp.map((_, indexVal) => {

        return <PinInput type = "number" key = {indexVal} size = "lg">
      
        <PinInputField value = {otp[indexVal] || ""} ref = {activeOtpIndex === indexVal ? inputRef : null as any} onChange = {handleNextOTP} padding = "3" marginRight={8}/>

  </PinInput>
     })}


    </>


  )
}

export default VerifyInput