'use client';

import {BACKEND_URL} from '@/constants';
import {useRouter} from 'next/navigation';
import {useIsClient} from '@uidotdev/usehooks';
import {Suspense, useState} from 'react';
import {useAuthTokenData} from '@/lib/authentication';

async function signIn(loginData, router, setToken) {
  const response = await fetch(`${BACKEND_URL}/accounts/login/`, {
    method: 'POST',
    body: loginData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return responseData
  }

  setToken(responseData);

  return null;
}

function LoginForm() {
  const router = useRouter();
  const [_, setToken] = useAuthTokenData();
  const [error, setError] = useState(null);

  return <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={async (event) => {
        event.preventDefault();

        setError(null);

        const signInResult = await signIn(
            new FormData(event.target), router, setToken
        );

        if (signInResult) {
          setError(signInResult);
        } else {
          router.push('/');
        }
      }}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2"
             htmlFor="username">
        Username
      </label>
      <input
          name="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Username"/>
    </div>
    <div className="mb-2">
      <label className="block text-gray-700 text-sm font-bold mb-2"
             htmlFor="password">
        Password
      </label>
      <input
          name="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="******************"/>
    </div>
    {error && <div className="mb-4">
      <div id="error-message" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>}
    <div className="flex items-center justify-between">
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit">
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
         href="#">
        Forgot Password?
      </a>
    </div>
  </form>;
}

export default function LoginPage() {
  const isClient = useIsClient();

  return <div className="flex justify-center items-center min-h-screen">
    <div className="w-full max-w-md">
      {isClient && <LoginForm/>}
      {!isClient && <Suspense fallback={<div>Loading...</div>}/>}
    </div>
  </div>;
}