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
import SingleNft from './pages/nfts/SingleNft';
import EditNft from './pages/nfts/EditNft';

const App: React.FC = () => {

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
          <Route path = "/verify-login" element = {<LoginMfaVerification />} />


          <Route path = '/create-nft' element = {<CreateNft />} />
          <Route path = '/nfts' element = {<NftList />} />
          <Route path = '/nfts/:id' element = {<SingleNft />} />
          <Route path = '/nfts/edit/:id' element = {<EditNft />}


        </Routes>



    </>



  );
}

export default App;