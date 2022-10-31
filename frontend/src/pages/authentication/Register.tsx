import React, {useState} from 'react'
import {Alert, AlertIcon, Button} from '@chakra-ui/react';
import { register } from '../../api/auth-api';

const Register: React.FC = () => {

  const [email, setEmail] = useState<string | undefined>("");
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);
  const [error, setError] = useState<string | undefined>("");
  const [isError, setIsError] = useState<boolean| null>(false);

  const handleRegisterAccount = async (event: any) => {

       try {
      
           event.preventDefault();
           
           setEmail(email);
           setUsername(username);
           setPassword(password);

          setFormSubmitted(true);
          setIsError(false);

          setEmail("")
          setUsername("");
          setPassword("");

       
         return register(email as string, username as string, password as string);
       } 
       
       catch(error: any) {
         
         if(error) {

            setIsError(true);
            setError(error);
            console.log(error);
            
         }

       }

  }

  return (

    <>
    
      {formSubmitted && !isError && <Alert status='success'>
         <AlertIcon />
         Registered Success
      </Alert>
      
      }

       <div className = "register-container">

          <div className = "register-form">

            <form onSubmit = {handleRegisterAccount} method = "POST">

             <h1 className = "heading-primary">Register</h1>

              <div className = "username-container">

                <label htmlFor= "username">Username</label>
                   <input onChange = {(event) => setUsername(event.target.value)} value = {username} type = "text" placeholder='Username'/>

              </div>

           <div className = "email-container">

                <label htmlFor= "email">E-mail</label>
                <input onChange = {(event) => setEmail(event.target.value)} value = {email} type = "text" placeholder='Enter E-mail Address'/>
             </div>

             <div className = "password-container">
                <label className = "password-lbl" htmlFor= "password">Password</label>
                <input onChange = {(event) => setPassword(event.target.value)} value = {password} type = "password" placeholder='Enter Password'/>
             </div>


            <Button className = "submit-btn" type = "submit" colorScheme='teal' size ='md'>Register Account</Button>

            <p className='paragraph'> Already have an account ?  <a href = "/login">Login</a> </p>


            </form>


          </div>


       </div>


    </>

    
  )
}

export default Register;