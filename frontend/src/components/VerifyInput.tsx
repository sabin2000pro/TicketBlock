import React, {useState, useRef, useEffect} from 'react'
import { Button, PinInput, PinInputField } from '@chakra-ui/react'

let currOTPIndex = 0;

const VerifyInput: React.FC = (props: any) => {
  const inputRef = useRef<any>();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const moveNextOTP = (currOTPIndex: any) => {
     setActiveOtpIndex(currOTPIndex + 1);
  }

  const handleNextOTP = (event: any) => {
    
    event.preventDefault()    
    const newOtpVals = [...otp];
    newOtpVals[currOTPIndex] = event.target.value.substring(event.target.value.length - 1, event.target.value.length);


    moveNextOTP(currOTPIndex)
    setOtp([...newOtpVals]);
     
  
  }

  const handleOtpSubmission = () => {

  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex]);


  return (

    <>

<div className = "forgot-container">

<div className = "forgot-form">

<form onSubmit = {handleOtpSubmission} method = "POST">

<h1 className = "heading-primary">Verify E-mail Address</h1>

      <div className = "pin-container">

      {otp.map((_, index) => {

  return ( <PinInput otp key = {index} type = "number" size = "lg">

  <PinInputField type = "number" onChange = {handleNextOTP} value = {otp[index] || ""} ref = {activeOtpIndex === index ? inputRef : null as any}  padding = "2" marginRight={8}/>

  </PinInput>

  )

})}
      </div>

    <Button type = "submit" className = "submit-btn" colorScheme='teal' size ='lg'>Verify Account</Button>

</form>


</div>

</div>




    </>


  )
}

export default VerifyInput