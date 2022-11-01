import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom'
import { Register } from './pages/auth-index';
import ForgotPassword from './pages/authentication/ForgotPassword';
import Login from './pages/authentication/Login';
import ResetPassword from './pages/authentication/ResetPassword';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import './index.css'
import CreateNft from './pages/nfts/CreateNft';
import NftList from './pages/nfts/NftList';
import UserProfile from './pages/UserProfile';
import EmailVerification from './pages/authentication/EmailVerification';
import LoginMfaVerification from './pages/authentication/LoginMfaVerification';
import { useContext } from 'react';
import { Web3Context } from './context/Web3Contex';

const App: React.FC = () => {

  const {getAccount, connectWallet} = useContext(Web3Context)
  
  useEffect(() => {
    console.log(getAccount)
  }, [])

  return (

    <>

     <NavBar />

        <Routes>

          <Route path = '/register' element = {<Register />} />
          <Route path = '/' element = {<Home />} />
          <Route path = "/profile" element = {<UserProfile />} />

          <Route path = '/login' element = {<Login />} />
          <Route path = '/forgot-password' element = {<ForgotPassword />} />
          <Route path = '/reset-password' element = {<ResetPassword />} />

          <Route path = "/verify-email" element = {<EmailVerification />} />
          <Route path = "/login-verify" element = {<LoginMfaVerification />} />


          <Route path = '/create-nft' element = {<CreateNft />} />
          <Route path = '/nfts' element = {<NftList />} />


        </Routes>
    </>



  );
}

export default App;