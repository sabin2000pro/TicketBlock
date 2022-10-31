import React, {useContext, useState} from 'react'
import { Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../api/auth-api'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string | undefined>("")
  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);

  const handleForgotPassword = async (event: any) => {

    try {
        event.preventDefault();

        setEmail(email);
        setFormSubmitted(!formSubmitted);

        return forgotPassword(email as any);
    } 
    
    catch(error: any) { 

      if(error) {
        return console.error(error);
      }


    }


  }

  return (

    <>

      <div className = "forgot-container">

         <div className = "forgot-form">

          <form onSubmit = {handleForgotPassword} method = "POST">

          <h1 className = "heading-primary">Forgot Password</h1>

              <div className = "email-container">

                <label htmlFor= "username">E-mail</label>
                  <input type = "text" placeholder='E-mail Address'/>

              </div>

              <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Submit</Button>

          </form>


         </div>
      </div>


    </>

    
  )
}

export default ForgotPassword