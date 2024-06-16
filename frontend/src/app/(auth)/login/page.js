'use client';

import {BACKEND_URL} from '@/constants';
import {useRouter} from 'next/navigation';
import {useIsClient} from '@uidotdev/usehooks';
import {useAuthTokenData} from '@/lib/authentication';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Link from 'next/link';

async function signIn(loginData, setToken) {
  const formDataForSubmission = new FormData();
  formDataForSubmission.append('email', loginData.email);
  formDataForSubmission.append('password', loginData.password);

  const response = await fetch(`${BACKEND_URL}/accounts/login/`, {
    method: 'POST',
    body: formDataForSubmission,
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

  const schema = z.object({
    email: z.string().min(1, {message: "Email is required."}).email(),
    password: z.string().trim().min(1, {message: "Password is required."}),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema)
  });

  return <form
      onSubmit={handleSubmit(async (data) => {
        const signInResponse = await signIn(data, setToken);
        if (signInResponse === null) {
          router.push('/');
        } else {
          setError('root.error', {type: 'custom', message: signInResponse});
        }
      })}>

    <h2 className="text-2xl mb-6 text-center">Login</h2>

    {errors.root?.error && <div className="mb-2 text-red-600">
      {errors.root.error.message}
    </div>}

    <div className="mb-4">
      <label htmlFor="email" className="block font-light mb-1">Email
        address</label>
      <input {...register('email', {required: true})}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"/>
      {errors.email && <span className="text-red-600">{errors.email.message}</span>}
    </div>

    <div className="mb-4">
      <label htmlFor="password"
             className="block font-light mb-2">Password</label>
      <input type="password" {...register('password', {required: true})}
             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"/>
      {errors.password && <span className="text-red-600">{errors.password.message}</span>}
    </div>

    <div className="flex items-center mb-6">
      <input type="checkbox" id="remember" className="mr-2"/>
      <label htmlFor="remember" className="text-sm">Remember me</label>
      <a href="#" className="text-sm text-blue-500 ml-auto">Forgot
        password?</a>
    </div>

    <button
        className="w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded-md hover:bg-blue-600 transition duration-300">
      Sign in
    </button>
    <Link
        href="/register"
        className="block text-center w-full bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300">
      Create a new account
    </Link>

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