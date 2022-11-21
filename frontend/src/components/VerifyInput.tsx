import React, {useState} from 'react';
import {AlertIcon, Button} from "@chakra-ui/react";
import axios from 'axios';
import { Alert } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';

type IVerifyInput = {
  userId: string | undefined
}

const VerifyInput: React.FC<IVerifyInput> = ({userId}) => {

  const [OTP, setOTP] = useState<string | undefined>("");
  const [isVerified, setIsVerified] = useState<boolean | undefined>(false);
  const navigate = useNavigate();

  const handleOtpSubmission = async (event: any) => {

     try {

        event.preventDefault();
        setOTP(OTP);

        const response = await axios.post(`http://localhost:5299/api/v1/auth/verify-email`, {userId, OTP});
        const data = response.data;

        setIsVerified(!isVerified);
        setOTP("");

        setTimeout(() => {
            return navigate('/login')
        }, 1500)

        return data;
        
     } 
     
     catch(error: any) {


        if(error) {
          return console.log(error.response);
        }
        
     }

  }

  return <>

  {isVerified && <Alert status='success'>

    <AlertIcon />
      E-mail Address Verified
    </Alert>}

    <div className = "forgot-container">

<div className = "forgot-form">

<form onSubmit = {handleOtpSubmission} method = "POST">

<h1 className = "heading-primary">Verify E-mail Address</h1>

      <div className = "pin-container">

      <input value = {OTP} onChange = {(event) => setOTP(event.target.value)} type = "text" placeholder='Enter OTP'/>

      </div>

    <Button type = "submit" className = "submit-btn verify-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

</form>


</div>

</div>



  </>
}

export default VerifyInput