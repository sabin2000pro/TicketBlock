import React, { useState, useRef } from 'react'
import { Button } from "@chakra-ui/react";

const EmailVerification: React.FC = () => {

  const [otp, setOtp] = useState<string | undefined>("");
  const [otpSubmitted, setOtpSubmitted] = useState<boolean | undefined>(false)

  const handleOtpSubmission = async () => {

      try {

      } 
      
      catch(err: any) {

      }
  }

  return (

    <>
  <div className = "forgot-container">

<div className = "forgot-form">

 <form onSubmit = {handleOtpSubmission} method = "POST">

 <h1 className = "heading-primary">Forgot Password</h1>

     <div className = "email-container">

     </div>

     <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Submit</Button>

 </form>


  </div>
  </div>
    </>


  )
}

export default EmailVerification