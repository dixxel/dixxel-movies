'use client';

import { useState } from 'react';
import SignUpForm from './SignUpForm';
import VerificationForm from './VerificationForm';

const SignIn = () => {
  const [pendingVerification, setPendingVerification] = useState(false);

  return (
    <div className='p-5 flex justify-center items-center flex-col px-0 max-w-[1000px] w-full'>
      {pendingVerification ? (
        <VerificationForm />
      ) : (
        <SignUpForm setPendingVerification={(state) => setPendingVerification(state)} />
      )}
    </div>
  );
};

export default SignIn;
