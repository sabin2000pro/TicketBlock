import React, {useState, useRef, useEffect} from 'react'
import { PinInput, PinInputField } from '@chakra-ui/react'

type IVerifyInput = {
  otp: any[]
  setOtp: (nextVals: any) => void
  currOTPIndex: any
}

const VerifyInput: React.FC<IVerifyInput> = ({otp, currOTPIndex, setOtp}) => {
  const inputRef = useRef<any>();
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const handleNextOTP = (event: any) => {
     const nextOtpVals = [...otp];

     nextOtpVals[currOTPIndex] = event.target.value.substring(event.target.value.length - 1, event.target.value.length);
     console.log(nextOtpVals[currOTPIndex])

     console.log(`Next OTP VAls `, nextOtpVals[currOTPIndex])

     setActiveOtpIndex(currOTPIndex + 1);

     setOtp([...nextOtpVals]);


  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex]);

  return (

    <>

     {otp.map((_, indexVal) => {

        return <PinInput key = {indexVal} type = "number" size = "lg">
      
        <PinInputField value = {otp[indexVal] || ""} ref = {activeOtpIndex === indexVal ? inputRef : null as any} onChange = {handleNextOTP} padding = "3" marginRight={8}/>

  </PinInput>
     })}


    </>


  )
}

export default VerifyInput