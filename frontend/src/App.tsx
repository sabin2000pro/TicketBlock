import React, {useState, useEffect, useContext} from 'react';
import {Route, Routes} from 'react-router-dom'
import { Register } from './pages/auth-index';
import ForgotPassword from './pages/authentication/ForgotPassword';
import Login from './pages/authentication/Login';
import ResetPassword from './pages/authentication/ResetPassword';
import NavBar from './components/NavBar';
import './index.css'
import CreateNft from './pages/nfts/CreateNft';
import NftList from './pages/nfts/NftList';
import UserProfile from './pages/UserProfile';
import EmailVerification from './pages/authentication/EmailVerification';
import LoginMfaVerification from './pages/authentication/LoginMfaVerification';
import SingleNft from './pages/nfts/SingleNft';
import EditNft from './pages/nfts/EditNft';
import Homepage from './pages/Homepage';
import { Web3Context } from './context/Web3Context';

const App: React.FC = () => {
  
  // Code to detect if metamask is installed // connected

  const {fetchNftData} = useContext(Web3Context)
  let [nftData, setNftData] = useState<any[]>([]);

  useEffect(() => {

    const getAllNftData = async () => {
      
       const nftVals = await fetchNftData();
       setNftData(nftVals);

       return nftVals
       
    }

    getAllNftData();

  }, [])

  
  return (

    <>

     <NavBar />

        <Routes>

          <Route path = '/' element = {<Homepage />} />
          <Route path = '/register' element = {<Register />} />
          <Route path = "/profile" element = {<UserProfile />} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/forgot-password' element = {<ForgotPassword />} />
          <Route path = '/reset-password' element = {<ResetPassword />} />

          <Route path = "/verify-email" element = {<EmailVerification />} />
          <Route path = "/verify-login" element = {<LoginMfaVerification />} />

          <Route path = '/create-nft' element = {<CreateNft />} />
          <Route path = '/nfts' element = {<NftList nfts = {nftData as any} />} />
          <Route path = '/nfts/:id' element = {<SingleNft />} />
          <Route path = '/nfts/edit/:id' element = {<EditNft />} />

        </Routes>

    
    </>



  );
}

export default App;