import React, {useState} from 'react'
import { Button, useDisclosure } from "@chakra-ui/react";
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const LoginMfaVerification = (props: any) => {

  const [mfaCode, setMfaCode] = useState<string | undefined>("");
  const [showErrorModal, setShowErrorModal] = useState<boolean | undefined>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleMfaVerification = async (event: any) => {
     try {

      event.preventDefault();

      if(!mfaCode) {
        setShowErrorModal(!showErrorModal);
  
        console.log(`Mfa missing`)
     }

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

      <input value = {mfaCode} onChange = {(event) => setMfaCode(event.target.value)} type = "text" placeholder='Enter MFA Code'/>

      </div>

    <Button type = "submit" className = "submit-btn verify-btn" colorScheme='teal' size ='lg'>Verify Code</Button>

</form>


</div>

</div>

    
    </>
  )
}

export default LoginMfaVerification