import React, {useEffect, useState} from 'react'
import { getLoggedInUser } from '../api/auth-api';

const UserProfile = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {

        const fetchUserData = async () => {

            const response = await getLoggedInUser();
            setUser(response.data.username);

            console.log(user);
            
        }

        fetchUserData();

    }, [user])


  return (

    <>

        <div className = "profile-container">

            <h1 className = "heading-primary">You are logged in as : {user}</h1>

            

            <div className = "user-profile">
               
               <h2>Account Balance : </h2>
            </div>


        </div>
    </>


  )
}

export default UserProfile