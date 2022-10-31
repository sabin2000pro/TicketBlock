import React, {useState} from 'react'
import {Alert, Button} from '@chakra-ui/react';

import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isError, setIsError] = useState<boolean| null>(false);

  const handleRegisterAccount = async () => {

       try {
         setUsername(username);
         setEmail(email);
         setPassword(password);
         
          const response = await axios.post(`http://localhost:5299/api/v1/auth/register`, {email, username, password});

          console.log(response);

          setFormSubmitted(!formSubmitted);
          setIsError(!isError);
       } 
       
       catch(error: any) {
         
         if(error.response) {
            setIsError(true);
            setError(error);
            
            console.log(error)
         }

       }

  }

  return (

    <>

       <div className = "register-container">

          <div className = "register-form">

            <form method = "POST">

             <h1 className = "heading-primary">Register</h1>

              <div className = "username-container">

                <label htmlFor= "username">Username</label>
                   <input type = "text" placeholder='Username'/>

              </div>

           <div className = "email-container">

                <label htmlFor= "email">E-mail</label>
                <input type = "text" placeholder='Enter E-mail Address'/>
             </div>

             <div className = "password-container">
                <label className = "password-lbl" htmlFor= "password">Password</label>
                <input type = "text" placeholder='Enter Password'/>
             </div>


            <Button onClick = {() => handleRegisterAccount()} className = "submit-btn" colorScheme='teal' size ='md'>Register Account</Button>

            <p className='paragraph'> Already have an account ?  <a href = "/login">Login</a> </p>


            </form>


          </div>


       </div>


    </>

    
  )
}

export default Register;