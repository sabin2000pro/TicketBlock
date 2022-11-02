import React, {useEffect, useState} from 'react'
import { Button, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,ModalCloseButton} from '@chakra-ui/react'
import { verifyLoginMFA } from '../../api/auth-api';

const LoginMfaVerification = (props: any) => {

  const [token, setToken] = useState<string | undefined>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean | undefined>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [userId, setUserId] = useState([]);

  useEffect(() => {

    const fetchUserId = () => {

       const userId = localStorage.getItem("userId");
       setUserId(userId as any);

    }

    fetchUserId();

  }, [])

  const handleMfaVerification = async (event: any) => {
     try {

      event.preventDefault();

      if(!token) {
        setShowErrorModal(!showErrorModal);
     }

     verifyLoginMFA(userId as any, token as any);

     } 
     
     catch(error: any) {

     }
  }

  const handleCloseModal = () => {
     setShowErrorModal(false);
  }


  return (
    <>


    {showErrorModal && <Modal isOpen = {showErrorModal} onClose = {onClose}>

    <ModalOverlay />

    <ModalContent>


      <ModalHeader>Multi Factor Code Missing</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        
      </ModalBody>

      <ModalFooter>

        <Button colorScheme='blue' mr={3} onClick={handleCloseModal}>
          Close
        </Button>


      </ModalFooter>
    </ModalContent>
  </Modal>}
    

    <div className = "forgot-container">

<div className = "forgot-form">

<form onSubmit = {handleMfaVerification} method = "POST">

<h1 className = "heading-primary">Login Verification</h1>

      <div className = "pin-container">

      <input value = {token} onChange = {(event) => setToken(event.target.value)} type = "text" placeholder='Enter MFA Token'/>

      </div>

    <Button type = "submit" className = "submit-btn verify-btn" colorScheme='teal' size ='lg'>Verify Code</Button>

</form>


</div>

</div>

    
    </>
  )
}

export default LoginMfaVerification