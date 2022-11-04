import React, { useEffect, useState } from 'react'
import VerifyInput from '../../components/VerifyInput';

const EmailVerification: React.FC = () => {
  const [userId, setUserId] = useState<string | undefined>("");
  
  useEffect(() => {

    const fetchUserId = () => {

       const userId = localStorage.getItem("userId");
       setUserId(userId as any);

    }

    fetchUserId();

  }, [])

  return (

    <>
    
      <VerifyInput userId = {userId} />

    </>


  )
}

export default EmailVerification