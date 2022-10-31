import React, {useState, useEffect} from 'react'
import {Alert, AlertIcon, Button, AlertTitle, AlertDescription, Spinner} from '@chakra-ui/react';

import axios from 'axios';

const Register: React.FC = (props) => {
  const [username, setUsername] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean | undefined>(false);

  const handleRegisterAccount = async (event: any) => {
       event.preventDefault();
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

             <div className = "role-container">
             <label>Select Role</label>

             <select className = "select-container">
              
              <option>Admin</option>
              <option>Moderator</option>
              <option>User</option>


             </select>


             </div>


              <Button className = "submit-btn" colorScheme='teal' size ='md'>Register Account</Button>

            <p className='paragraph'> Already have an account ?  <a href = "/login">Login</a>  </p>
            </form>


          </div>


       </div>


    </>

    
  )
}

export default Register;