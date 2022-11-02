import React, {useState} from 'react'
import { Button } from "@chakra-ui/react";
import axios from 'axios';

const LoginMfaVerification = (props: any) => {

  const [mfaCode, setMfaCode] = useState("");

  const handleMfaVerification = async () => {
     try {
      const response = await axios.post(`http://localhost:5299/api/v1/auth/verify-mfa`, {mfaCode});
      const data = response.data;

      console.log(response);


      return data;
     } 
     
     catch(error: any) {

     }
  }


  return (
    <>
    

    <div className = "forgot-container">

<div className = "forgot-form">

<form onSubmit = {handleMfaVerification} method = "POST">

<h1 className = "heading-primary">Login Verification</h1>

      <div className = "pin-container">

      <input value = {mfaCode} onChange = {(event) => setMfaCode(event.target.value)} type = "text" placeholder='Enter MFA Code'/>

      </div>

    <Button type = "submit" className = "submit-btn verify-btn" colorScheme='teal' size ='lg'>Verify Code</Button>

</form>


</div>

</div>

    
    </>
  )
}

export default LoginMfaVerification