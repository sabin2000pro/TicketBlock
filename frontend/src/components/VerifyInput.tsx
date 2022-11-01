import React, {useState, useRef, useEffect} from 'react'
import { Button, PinInput, PinInputField } from '@chakra-ui/react'

let LENGTH_OF_OTP = 6 ;
let currOTPIndex: any;

const VerifyInput: React.FC = (props: any) => {
  const inputRef = useRef<any>();

  const [otp, setOtp] = useState(new Array(LENGTH_OF_OTP).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const focusNextOtp = (currOTPIndex: any) => {
    setActiveOtpIndex(currOTPIndex + 1);
  }

  const focusPrevInputField = (index: any) => {
    let nextIndex;
    const diff = index - 1;

    nextIndex = diff !== 0 ? diff : 0;
    setActiveOtpIndex(nextIndex);
  };

  const handleNextOTP = ({target} :any) => {
    const { value } = target;
    const newOtp = [...otp];

    newOtp[currOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusPrevInputField(currOTPIndex);

    else {
      
      focusNextOtp(currOTPIndex)
      setOtp([...newOtp]);
 
     console.log(newOtp);
    }
  


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

  return <PinInput otp key = {index} type = "number" size = "lg">

  <PinInputField value = {otp[index] || ""} ref = {activeOtpIndex === index ? inputRef : null as any} onChange = {handleNextOTP}  padding = "2" marginRight={8}/>

  </PinInput>
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