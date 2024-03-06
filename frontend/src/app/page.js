'use client';

import {BACKEND_URL} from '@/constants';
import {useState} from 'react';

async function signIn(setState) {
  const loginData = new FormData();
  loginData.append('username', 'admin');
  loginData.append('password', 'admin');

  const response = await fetch(`${BACKEND_URL}/accounts/login/`, {
    method: 'POST',
    body: loginData,
  });
  const responseData = await response.json();
  setState(responseData);
}

async function whoAmI(tokenData) {
  console.log(
      await fetch(`${BACKEND_URL}/accounts/me/`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${tokenData.token}`,
        },
      }),
  );
}

export default function Home() {
  const [token, setToken] = useState();

  return (
      <main className="flex min-h-dvh w-full flex-col justify-around">
        <h1 className="text-center">Home</h1>
        <button
            className=""
            onClick={() => {
              signIn(setToken);
            }}
        >
          Sign In
        </button>
        <button
            onClick={() => {
              whoAmI(token);
            }}
        >
          Who Am I
        </button>
      </main>
  );
}
