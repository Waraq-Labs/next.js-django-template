'use client';

import {BACKEND_URL} from '@/constants';
import {useRouter} from 'next/navigation';
import {useIsClient} from '@uidotdev/usehooks';
import {useState} from 'react';
import {useAuthTokenData} from '@/lib/authentication';

async function signIn(loginData, router, setToken) {
  const response = await fetch(`${BACKEND_URL}/accounts/login/`, {
    method: 'POST',
    body: loginData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    return responseData;
  }

  setToken(responseData);

  return null;
}

function LoginForm() {
  const router = useRouter();
  const [_, setToken] = useAuthTokenData();
  const [error, setError] = useState(null);

  return <form
      onSubmit={async (event) => {
        event.preventDefault();

        setError(null);

        const signInResult = await signIn(
            new FormData(event.target), router, setToken,
        );

        if (signInResult) {
          setError(signInResult);
        } else {
          router.push('/');
        }
      }}>

    <h2 className="text-2xl mb-6 text-center">Login</h2>

    <div className="mb-4">
      <label htmlFor="username" className="block font-light mb-1">Email
        address</label>
      <input id="username" name="username"
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"/>
    </div>

    <div className="mb-4">
      <label htmlFor="password"
             className="block font-light mb-2">Password</label>
      <input type="password" id="password" name="password"
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"/>
    </div>

    <div className="flex items-center mb-6">
      <input type="checkbox" id="remember" className="mr-2"/>
      <label htmlFor="remember" className="text-sm">Remember me</label>
      <a href="#" className="text-sm text-blue-500 ml-auto">Forgot
        password?</a>
    </div>

    {error && <div className="mb-4">
      <div id="error-message"
           className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>}

    <button
        className="w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded-md hover:bg-blue-600 transition duration-300">
      Sign in
    </button>
    <button
        className="w-full bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300">
      Create a new account
    </button>

  </form>;
}

export default function LoginPage() {
  const isClient = useIsClient();

  return <div
      className="flex justify-center items-center min-h-screen bg-gray-50">
    <div
        className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-md p-8">
      {isClient && <LoginForm/>}
      {!isClient && <div>Loading...</div>}
    </div>
  </div>;
}