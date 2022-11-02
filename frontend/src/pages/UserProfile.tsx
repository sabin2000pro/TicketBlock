import {useEffect, useState} from 'react'
import { Card, Row } from 'react-bootstrap';
import { Button } from "@chakra-ui/react";
import { getLoggedInUser } from '../api/auth-api';
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';
import { useContext } from 'react';
import { Avatar } from '@chakra-ui/react';

const toastPositions = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left',
  ]


const UserProfile: React.FC = (props: any) => {

    const navigate = useNavigate();
    const toast = useToast(); // Displayed after updating profiel details

    const [user, setUser] = useState([])
    
    let [accountBalance, setAccountBalance] = useState<string | undefined>("");
    let {balance} = useContext(Web3Context)

  useEffect(() => {

    const fetchUserData = async () => { // Fetch the logged in user data

        const response = await getLoggedInUser();
        setUser(response.data.username);
    }

    fetchUserData();

}, [user])

    useEffect(() => {

        const fetchAccountBalance = async () => {

            const currBalance = localStorage.getItem("balance")            
            setAccountBalance(currBalance as any);

        }

        fetchAccountBalance();

    }, [balance])

    const handleNftRedirect = () => {
        return navigate("/nfts");
    }

    const handleUpdateProfileSettings = async (): Promise<void> => {
        try {
            console.log("Updating profile data...");
        } 
        
        catch(error: any) {

        }


    }

  return (

    <>

       
    <div className = "profile-container">


     <h1 className = "heading-primary">You are logged in as : {user}</h1>

   <div className = "account-container">

   <Button type = "submit" colorScheme='teal' size='md'>Upload Avatar</Button>

   </div>

     <Row md = {2} xs = {1} lg = {3} className = "g-3">

        <Card className = "h-25 w-25 p-4 mx-5 mt-5">
 
            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Owned NFTs: 0</span>

            </Card.Title>

            <Button onClick = {handleNftRedirect} className = "nft-btn" type = "submit" colorScheme='teal' size='md'>View Available NFTs</Button>

                </Card.Body>
            </Card>


         <Card className = "h-25 w-25 mx-5 p-4 mt-5">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text">Profile Settings </span>

                
               
            </Card.Title>

            
            <div className = "avatar-container">
            <Avatar src='https://bit.ly/broken-link' className = "avatar" />
            </div>


            <h2 className = "heading-secondary">Username</h2>

            <input className = "update-username" type = "text" />

            <h2 className = "heading-secondary">Password</h2>

            <input className = "update-username" type = "text" />

            <h2 className = "heading-secondary">E-mail</h2>

            <input className = "update-username" type = "text" />

            <Button onClick = {handleUpdateProfileSettings} type = "submit" colorScheme='teal' size='md'>Update Details</Button>

                </Card.Body>
            </Card>

    
        <Card className = "h-25 w-25 mx-5 p-4 mt-5">

            <Card.Body className = "d-flex flex-column custom">

            <Card.Title className = "d-flex align-items-baseline justify-content-between mb-4">

                <span className = "fs-2 card-text p-2">Balance: {accountBalance} ETH</span>
                
            </Card.Title>

         </Card.Body>


         </Card>
          

     </Row>


        </div>
    </>


  )
}

export default UserProfile