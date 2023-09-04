'use client';

import { useState } from 'react';

const Cookie = () => {
  const [cookie, setCookie] = useState(false);
  const handleCookieClick = async () => {
    const response = await fetch('/api/cookies', {
      method: 'POST',
    });

    if (response.status === 200) setCookie(true);
  };

  return (
    <>
      {!cookie ? (
        <div className='fixed bottom-0 left-0 w-full z-50 bg-blue-500 flex items-center justify-center flex-col p-2'>
          <p>Can we eat some of your cookies?</p>
          <button onClick={handleCookieClick}>Yes, eat my cookies</button>
        </div>
      ) : null}
    </>
  );
};

export default Cookie;
