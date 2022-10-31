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
import { getLoggedInUser } from './api/auth-api';



const App: React.FC = () => {
  const [user, setUser] = useState([])

  useEffect(() => {

    const fetchUserData = async () => { // Fetch the logged in user data

        const response = await getLoggedInUser();
        setUser(response.data.username);
        
    }

    fetchUserData();

}, [user])


  return (

    <>

     <NavBar />

        <Routes>

          <Route path = '/register' element = {<Register />} />
          <Route path = '/' element = {<Home />} />
          <Route path = "/profile" element = {<UserProfile user = {user} />} />

          <Route path = '/login' element = {<Login />} />
          <Route path = '/forgot-password' element = {<ForgotPassword />} />
          <Route path = '/reset-password' element = {<ResetPassword />} />
          <Route path = '/create-nft' element = {<CreateNft />} />
          <Route path = '/nfts' element = {<NftList />} />


        </Routes>
    </>



  );
}

export default App;