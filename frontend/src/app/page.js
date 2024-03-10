'use client';

import {BACKEND_URL} from '@/constants';
import {getTokenIfValid, useAuthTokenData} from '@/lib/authentication';
import {useEffect, useState} from 'react';
import ClientOnlyWrapper from '@/components/client_only_wrapper';

function WhoAmI() {
  const [tokenData] = useAuthTokenData();
  const [whoAmI, setWhoAmI] = useState(null);

  const token = getTokenIfValid(tokenData);

  useEffect(() => {
    (async () => {
      if (tokenData !== null) {
        const response = await fetch(`${BACKEND_URL}/accounts/me/`, {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        })

        if (response.ok) {
          const responseData = await response.json();
          setWhoAmI(responseData);
        }
      }
    })();
  });

  if (whoAmI === null) {
    return <div className="text-center text-red-600">Not logged in</div>;
  } else {
    return <div className="text-center">{whoAmI}</div>;
  }
}

export default function Home() {
  return (
      <main className="flex min-h-dvh w-full flex-col justify-around">
        <h1 className="text-center text-4xl">Home</h1>
        <ClientOnlyWrapper fallback={<div className="text-center">Loading...</div>}>
          <WhoAmI/>
        </ClientOnlyWrapper>
      </main>
  );
}
