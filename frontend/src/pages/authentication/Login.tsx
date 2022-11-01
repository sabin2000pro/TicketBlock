import { Button, Alert, AlertIcon} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState<string | undefined>("");

  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined> (false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);
  const [authTokenPresent, setAuthTokenPresent] = useState<boolean | undefined>(false);

  const [isError, setIsError] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>("");

  const validateEntries = (email: string, password: string) => {
      return email.trim().length !== 0 || password.trim().length !== 0
  }
 
  const handleLogin = async (event: any) => {

    try {

        event.preventDefault();

        if(!validateEntries(email as string, password as string)) {
          
            setIsError(!isError);
            setError("Missing E-mail Or Password")

            setTimeout(() => {
                setIsError(false)
            }, 2000)
        }

        setEmail(email);
        setPassword(password);

        let response = await axios.post("http://localhost:5299/api/v1/auth/login", {email, password});

        const token = response.data.token;
        localStorage.setItem("token", token);

        setIsLoggedIn(!isLoggedIn);
        setAuthTokenPresent(!authTokenPresent);

        setFormSubmitted(!formSubmitted);

        setTimeout(() => {
           return navigate('/nfts')
        }, 2500)

        return response;
    }  
    
    catch(error: any) {

      if(error) {
        console.log(error.response);
        setError(error.response.data.errors.message)
      }


    }
  }

  useEffect(() => {

     if(localStorage.getItem("token") !== null) {

      alert("You are alredy logged in")
      return navigate('/nfts')

     }

  }, [])

  return (
    <>
              
    {formSubmitted && isLoggedIn && <Alert status='success'>

        <AlertIcon />
          You are logged in
        </Alert>
    }

    {isError && <Alert status='warning'>

    <AlertIcon />
      {error}
    </Alert>}

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