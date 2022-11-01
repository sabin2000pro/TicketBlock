import React, {useState} from 'react'
import { Alert, AlertIcon, Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../api/auth-api'
import { Spinner } from "@chakra-ui/react";
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>("")
  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);
  const [showSpinner, setShowSpinner] = useState<boolean | undefined>(false);
  const [showDialog, setShowDialog] = useState<boolean | undefined>(false);

  const [isError, setIsError] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>("");

  const handleForgotPassword = async (event: any) => {

    try {
        event.preventDefault();
        setEmail(email);
        
        let response = await axios.post(`http://localhost:5299/api/v1/auth/forgot-password`, {email});
        let data = response.data;

        setShowSpinner(!showSpinner);
        setFormSubmitted(!formSubmitted)

        setTimeout(() => {

          setShowSpinner(false);

          setShowDialog(!showDialog);

        }, 2500)

        setEmail("")

        return data;

    } 
    
    catch(error: any) { 

      if(error) {
        
        console.log(error.response.data);
        setIsError(!isError)

        setError(error.response.data.message);
      }


    }


  }

  return (

    <>

    <div className = "spinner-container">

      {isError && <Alert status='error'>

    <AlertIcon />
      {error}
    </Alert>}

      {showSpinner && formSubmitted && <Spinner size = 'xl' />}

      {showDialog && <Alert status='success'>

      <AlertIcon />
        Forgot Password Submission Sent
      </Alert>}

    </div>
    
      <div className = "forgot-container">

         <div className = "forgot-form">

          <form onSubmit = {handleForgotPassword} method = "POST">

          <h1 className = "heading-primary">Forgot Password</h1>

              <div className = "email-container">

                <label htmlFor= "username">E-mail</label>
                  <input value = {email} onChange = {(event) => setEmail(event.target.value)} type = "text" placeholder='E-mail Address'/>

              </div>

              <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Submit</Button>

          </form>


         </div>
      </div>


    </>

    
  )
}

export default ForgotPassword