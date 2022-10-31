import React, {useState} from 'react'
import { Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../api/auth-api'
import { Spinner } from "@chakra-ui/react";
import axios from 'axios';


const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | undefined>("")
  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);
  const [errors, setErrors] = useState([]);

  const handleForgotPassword = async (event: any) => {


    try {
        event.preventDefault();

        setEmail(email);
        
        const response = await axios.post(`http://localhost:5299/api/v1/auth/forgot-password`, {email});
        console.log(response);

        setTimeout(() => {
          setFormSubmitted(!formSubmitted);
          return navigate("/login")
        }, 2000)


    } 
    
    catch(error: any) { 

      if(error) {
        
        return console.error(error);
      }


    }


  }

  return (

    <>

    {formSubmitted && <Spinner size = 'lg' />}

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