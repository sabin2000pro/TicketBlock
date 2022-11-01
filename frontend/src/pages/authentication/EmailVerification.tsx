import React, { useState } from 'react'
import { Button } from "@chakra-ui/react";
import VerifyInput from '../../components/VerifyInput';

let OTP_LENGTH = 6

const EmailVerification: React.FC = () => {

  const handleOtpSubmission = async (event: any) => {

      try {
          event.preventDefault();
          console.log("Handling OTP")
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
              <VerifyInput />
          </div>

        <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

    </form>


  </div>

  </div>
    </>


  )
}

export default EmailVerification