import { Button } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("");

  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined> (false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);

  const handleLogin = async (event: any) => {

    try {
        event.preventDefault();
        const response = await axios.post("http://localhost:5299/api/v1/auth/login", {email, password});

        console.log(response);

        return response;
    }  
    
    catch(error: any) {

      if(error) {
        return console.error(error);
      }


    }

    
  }

  return (
    <>

      <div className = "login-container">


        <div className = "login-form">

           <form onSubmit={handleLogin} method = "POST">


           <h1 className = "heading-primary">Login</h1>

            <div className = "email-container">

              <label htmlFor= "username">E-mail</label>
                <input value = {email} onChange = {(event) => setEmail(event.target.value)} type = "text" placeholder='E-mail Address'/>

            </div>

            <div className = "password-container">
                <label className = "password-lbl" htmlFor= "password">Password</label>
                <input value = {password} onChange = {(event) => setPassword(event.target.value)} type = "text" placeholder='Enter Password'/>
            </div>

             <Button className = "submit-btn" colorScheme='teal' size ='md'>Login</Button>

             <p className = "paragraph">Forgot Password ?  <a href = '/forgot-password'>Reset Here</a>  </p>

           </form>


        </div>

      </div>


    </>


  )
}

export default Login