import React, {useState} from 'react'
import { Button } from "@chakra-ui/react";

const LoginMfaVerification = () => {
  const [mfaCode, setMfaCode] = useState("");

  const handleMfaVerification = async () => {

  }



  return (
    <>
    

    <div className = "forgot-container">

<div className = "forgot-form">

<form onSubmit = {handleMfaVerification} method = "POST">

<h1 className = "heading-primary">Login Verification</h1>

      <div className = "pin-container">

      <input value = {mfaCode} onChange = {(event) => setMfaCode(event.target.value)} type = "text" placeholder='Enter OTP'/>

      </div>

    <Button type = "submit" className = "submit-btn verify-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

</form>


</div>

</div>

    
    </>
  )
}

export default LoginMfaVerification