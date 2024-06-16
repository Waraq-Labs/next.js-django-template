'use client';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

function Input({type, otherProps}) {
  return <input type={type} {...otherProps}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1"/>;
}

function Error({error}) {
  if (error) {
    return <span className="text-red-600">
      {error.message}
    </span>;
  } else {
    return null;
  }
}

async function createAccount(data, setError, router) {
  console.log(data);
}

export default function Page() {
  const router = useRouter();

  const schema = z.object({
    fullName: z.string().min(1, 'Name is required.'),
    email: z.string().email(),
    password: z.string().
        min(8, 'Password length must be 8 characters or more.'),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password must match',
    path: ['confirmPassword'],
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({resolver: zodResolver(schema)});

  return <div
      className="flex justify-center items-center min-h-screen bg-gray-50">
    <div
        className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-md p-8">
      <h2 className="text-2xl text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit(async (data) => {
        await createAccount(data, setError, router);
      })}>
        <div className="mb-4">
          <label htmlFor="fullName"
                 className="block font-light mb-1">Name</label>
          <Input type="text"
                 otherProps={register('fullName',
                     {required: 'Name is required.'})}/>
          <Error error={errors.fullName}/>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-light mb-1">Email
            Address</label>
          <Input type="email" otherProps={register('email', {required: true})}/>
          <Error error={errors.email}/>
        </div>

        <div className="mb-4">
          <label htmlFor="password"
                 className="block font-light mb-1">Password</label>
          <Input type="password"
                 otherProps={register('password', {required: true})}/>
          <Error error={errors.password}/>
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-light mb-1">Confirm
            Password</label>
          <Input type="password"
                 otherProps={register('confirmPassword', {required: true})}/>
          <Error error={errors.confirmPassword}/>
        </div>

        <button
            className="w-full bg-blue-500 text-white py-2 px-4 mb-2 rounded-md hover:bg-blue-600 transition duration-300">
          Register
        </button>
      </form>
    </div>
  </div>;
}