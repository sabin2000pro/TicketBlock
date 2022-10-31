import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState<string | undefined>("")

  const handleLogin = async () => {
    try {

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
                <input type = "text" placeholder='Enter Password'/>
               
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