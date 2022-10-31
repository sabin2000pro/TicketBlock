import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { getLoggedInUser } from '../api/auth-api';

const UserProfile = () => {

    const [user, setUser] = useState([])
    

    useEffect(() => {

        const fetchUserData = async () => {
            getLoggedInUser();
        }

        fetchUserData();

    }, [])


  return (

    <>

        <div className = "profile-container">

            <h1 className = "heading-primary">Logged In As: </h1>

            <div className = "user-profile">
               
               
            </div>


        </div>
    </>


  )
}

export default UserProfile