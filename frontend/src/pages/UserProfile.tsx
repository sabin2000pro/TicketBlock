import React, {useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap';
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

     <Row md = {2} xs = {1} lg = {3} className = "g-3">

        <Card className = "h-25 w-25">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Owned NFTs: </span>
                   
            </Card.Title>

                </Card.Body>
            </Card>

             <Card className = "h-25 w-25">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Owned NFTs: </span>
                   
            </Card.Title>

                </Card.Body>
            </Card>



            <Card className = "h-25 w-25">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Owned NFTs: </span>
                
            </Card.Title>

             </Card.Body>


        </Card>

            </Row>



        </div>
    </>


  )
}

export default UserProfile