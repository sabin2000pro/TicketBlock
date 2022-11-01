import React, { useState } from 'react'
import { Button } from "@chakra-ui/react";
import VerifyInput from '../../components/VerifyInput';

let LENGTH_OF_OTP = 6 ;
let currOTPIndex: any;

const EmailVerification: React.FC = () => {

  const filledOtp = new Array(LENGTH_OF_OTP).fill("");

  const [otp, setOtp] = useState(filledOtp);


  const handleOtpSubmission = (event: any) => {
     event.preventDefault();

  }


  return (

    <>

  <div className = "forgot-container">

    <div className = "forgot-form">

    <form onSubmit = {handleOtpSubmission} method = "POST">

    <h1 className = "heading-primary">Verify E-mail Address</h1>

          <div className = "pin-container">
              <VerifyInput setOtp = {setOtp as any} currOTPIndex = {currOTPIndex} otp = {otp} />
          </div>

        <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

    </form>


  </div>

  </div>
    </>


  )
}

export default EmailVerification