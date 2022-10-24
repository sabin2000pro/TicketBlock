import React from 'react';
import {Route, Routes} from 'react-router-dom'
import { Register } from './pages/auth-index';
import ForgotPassword from './pages/authentication/ForgotPassword';
import Login from './pages/authentication/Login';
import ResetPassword from './pages/authentication/ResetPassword';

const App: React.FC = () => {

  return (

    <>
        <Routes>

          <Route path='' element = {<Register />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/forgot-password' element = {<ForgotPassword />} />
          <Route path = '/reset-password' element = {<ResetPassword />} />

        </Routes>
    </>



  );
}

export default App;