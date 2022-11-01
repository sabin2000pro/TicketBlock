import React, { useState } from 'react'
import { Button } from "@chakra-ui/react";
import VerifyInput from '../../components/VerifyInput';

let LENGTH_OF_OTP = 6

const EmailVerification: React.FC = () => {
  const filledOtp = new Array(LENGTH_OF_OTP).fill("");

  const [otp, setOtp] = useState(filledOtp)
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const handleOtpSubmission = async (event: any) => {

      try {
          event.preventDefault();
          setOtp(otp)
          
          console.log(`OTP ENTERED : ${otp}`)
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
              <VerifyInput otp = {otp as any} otpIndex = {activeOtpIndex} />
          </div>

        <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

    </form>


  </div>

  </div>
    </>


  )
}

export default EmailVerification