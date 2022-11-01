import React, { useState, useRef } from 'react'
import { Button } from "@chakra-ui/react";
import VerifyInput from '../../components/VerifyInput';

const EmailVerification: React.FC = () => {

  const [otp, setOtp] = useState<string | undefined>("");
  const [otpSubmitted, setOtpSubmitted] = useState<boolean | undefined>(false)

  const handleOtpSubmission = async () => {

      try {
        setOtp(otp);
      } 
      
      catch(err: any) {
        if(err) {
          return console.error(err);
        }
      }

  }

  return (

    <>
  <div className = "forgot-container">

<div className = "forgot-form">

 <form onSubmit = {handleOtpSubmission} method = "POST">

 <h1 className = "heading-primary">Verify E-mail Address</h1>

      <div className = "pin-container">
          <VerifyInput otp = {otp} />
      </div>

     <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

 </form>


  </div>
  </div>
    </>


  )
}

export default EmailVerification