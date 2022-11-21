import {useEffect, useState, useContext} from 'react'
import { Card, Row } from 'react-bootstrap';
import { Alert, AlertIcon, Button, Avatar } from "@chakra-ui/react";
import { getLoggedInUser, updateProfileSettings } from '../api/auth-api';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';

const UserProfile: React.FC = (props: any) => {

    const navigate = useNavigate();
    const [user, setUser] = useState([])
    const [username, setUsername] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");

    const [profileUpdated, setProfileUpdated] = useState<boolean | undefined>(false);
    let [accountBalance, setAccountBalance] = useState<string | undefined>("");

    const [isValidationError, setIsValidationError] = useState<boolean | undefined>(false)
    const [error, setError] = useState<any[] | undefined>([])

    let {balance, chosenAccount} = useContext(Web3Context)

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

    const validateUserProfile = () => {
        return username!.toString() !== "" && email!.toString() !== "";
    }

    const handleUpdateProfileSettings = async (event: any): Promise<void> => {

        try {

            event.preventDefault();

        
           if(!validateUserProfile()) {
                setIsValidationError(!isValidationError);
                setError(error);
           }    

           else {

            setUsername(username);
            setEmail(email as any);

            updateProfileSettings(username as any, email as any);

            setProfileUpdated(!profileUpdated);

            setUsername("");
            setEmail("")

           }

         
        } 
        
        catch(error: any) {


            if(error) {
                return console.error(error);

            }
        }


    }

    useEffect(() => {


        const fetchUserOwnedNfts = async () => {
            
            let userData = await getLoggedInUser();
            let userOwnedNfts = userData.data;            
            userOwnedNfts.accountAddress = chosenAccount

        }

        fetchUserOwnedNfts();

    }, [])

  return (

    <>

    {isValidationError && <Alert status = 'error'>

        <AlertIcon />

            Missing Profile Entries
            
        </Alert>}

  <form onSubmit = {handleUpdateProfileSettings} method = "POST">

    <div className = "profile-container">

     <h1 className = "heading-primary">You are logged in as : {user}</h1>
     
   <div className = "account-container">

   <Button type = "submit" colorScheme='teal' size='md'>Upload Avatar</Button>

       <span style = {{textAlign: 'center', display: 'block', marginTop: "40px"}}>Your account address: {chosenAccount} </span>
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
               <Avatar src = 'https://bit.ly/broken-link' className = "avatar" />
            </div>


            <h2 className = "heading-secondary profile-heading">Username</h2>

              <input value = {username} onChange = {(event) => setUsername(event.target.value)} className = "update-username" type = "text" />
        
            <h2 className = "heading-secondary profile-heading">E-mail</h2>

            <input value = {email} onChange = {(event) => setEmail(event.target.value)} className = "update-username" type = "text" />

            <Button type = "submit" colorScheme='teal' size='md'>Update Details</Button>

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

 </form>


    </>

  )
}

export default UserProfile