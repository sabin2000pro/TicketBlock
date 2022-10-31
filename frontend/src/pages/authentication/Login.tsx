import { Button, Alert, AlertIcon} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("");

  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined> (false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [tokenPresent, setTokenPresent] = useState<boolean | undefined>(false);

  const handleLogin = async (event: any) => {

    try {
        event.preventDefault();

        setEmail(email);
        setPassword(password);

        const response = await axios.post("http://localhost:5299/api/v1/auth/login", {email, password});
        const token = response.data.token;

        localStorage.setItem("token", token);

        setFormSubmitted(!formSubmitted);
        setIsLoggedIn(!isLoggedIn);

        setTimeout(() => {
           navigate("/"); // After logging in, go to view all NFTs
        }, 3500)

        return response;
    }  
    
    catch(error: any) {

      if(error) {
        console.log(error);
      }


    }

    
  }

  useEffect(() => {

    
     const fetchAuthToken = () => {
        localStorage.getItem("token");
        setIsLoggedIn(true);
        setTokenPresent(!tokenPresent);

     }

     fetchAuthToken();
  }, [])

  useEffect(() => {

    const fetchLoggedInUserData = async () => {

      try {
       
      } 
      
      catch(error: any) {
        if(error) {
          return console.error(error);
        }
      }



    } 

    fetchLoggedInUserData();
  }, [])


  return (
    <>
              
    {formSubmitted && isLoggedIn && <Alert status='success'>
        <AlertIcon />
          You are logged in
        </Alert>
    }

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
                <input value = {password} onChange = {(event) => setPassword(event.target.value)} type = "password" placeholder = 'Enter Password'/>
            </div>

             <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='md'>Login</Button>

             <p className = "paragraph">Forgot Password ?  <a href = '/forgot-password'>Reset Here</a>  </p>

           </form>


        </div>

      </div>


    </>


  )
}

export default Login