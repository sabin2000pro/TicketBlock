import React, { useState } from 'react'
import { Button } from "@chakra-ui/react";
import VerifyInput from '../../components/VerifyInput';


const EmailVerification: React.FC = () => {
  let LENGTH_OF_OTP = 6 ;
  let currOTPIndex;

  const filledOtp = new Array(LENGTH_OF_OTP).fill("");

  const [otp, setOtp] = useState(filledOtp);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const moveNextOtpField = (currOTPIndex: any) => {
    setActiveOtpIndex(currOTPIndex + 1);
}

  const handleOtpSubmission = (event: any) => {
     event.preventDefault();

     const newOTPVals = [...otp];     

  }


  return (

    <>

  <div className = "forgot-container">

    <div className = "forgot-form">

    <form onSubmit = {handleOtpSubmission} method = "POST">

    <h1 className = "heading-primary">Verify E-mail Address</h1>

          <div className = "pin-container">
              <VerifyInput otp = {otp} activeOtpIndex = {activeOtpIndex} moveNextOtpField = {moveNextOtpField} setActiveOtpIndex = {setActiveOtpIndex as any} />
          </div>

        <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

    </form>


  </div>

  </div>
    </>


  )
}

export default EmailVerification