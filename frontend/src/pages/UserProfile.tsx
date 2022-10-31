import {useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap';
import { Button } from "@chakra-ui/react";
import { getLoggedInUser } from '../api/auth-api';

const UserProfile = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {

        const fetchUserData = async () => {

            const response = await getLoggedInUser();
            setUser(response.data.username);
            
        }

        fetchUserData();

    }, [user])


  return (

    <>

       
    <div className = "profile-container">


     <h1 className = "heading-primary">You are logged in as : {user}</h1>

     <Row md = {2} xs = {1} lg = {3} className = "g-3">

        <Card className = "h-25 w-25 p-4 mx-5 mt-5">
 
            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Owned NFTs: </span>
                   
            </Card.Title>

                </Card.Body>
            </Card>



         <Card className = "h-25 w-25 mx-5 p-4 mt-5">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Profile Settings </span>
               
            </Card.Title>

            <h2 className = "heading-secondary">Username</h2>

            <input className = "update-username" type = "text" />

            <h2 className = "heading-secondary">Password</h2>

            <input className = "update-username" type = "text" />

            <h2 className = "heading-secondary">E-mail</h2>

            <input className = "update-username" type = "text" />

            <Button type = "submit" colorScheme='teal' size='md'>Update Details</Button>

                </Card.Body>
            </Card>

    
        <Card className = "h-25 w-25 mx-5 p-4 mt-5">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Balance </span>
                
            </Card.Title>

            </Card.Body>


            </Card>
          

     </Row>


        </div>
    </>


  )
}

export default UserProfile