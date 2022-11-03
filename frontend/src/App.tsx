import React, {useState, useEffect} from 'react';
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
import { useContext } from 'react';
import { Web3Context } from './context/Web3Context';

const App: React.FC = () => {
  
  // Code to detect if metamask is installed // connected

  const {fetchNftData} = useContext(Web3Context)
  const [nftData, setNftData] = useState<any[] | null>([]);

  useEffect(() => {

    const getAllNftData = async () => {
       await fetchNftData();
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
          <Route path = '/nfts' element = {<NftList />} />
          <Route path = '/nfts/:id' element = {<SingleNft />} />
          <Route path = '/nfts/edit/:id' element = {<EditNft />} />


        </Routes>

     


    </>



  );
}

export default App;