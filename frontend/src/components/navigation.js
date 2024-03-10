'use client';

import Link from 'next/link';
import ClientOnlyWrapper from '@/components/client_only_wrapper';
import {getTokenIfValid, useAuthTokenData} from '@/lib/authentication';

function LoginLogoutLink() {
  const [tokenData, setToken] = useAuthTokenData();
  const token = getTokenIfValid(tokenData);

  const classes = 'text-gray-300 hover:text-white';

  if (token !== null) {
    return <a href={'/'} className={classes} onClick={() => {
      setToken(null);
    }}>Logout</a>;
  } else {
    return <a href={'/login'} className={classes}>Login</a>;
  }
}

export default function Navigation() {
  const linkTextClasses = 'text-gray-300 hover:text-white';
  const authStateLoginPlaceholder = <span className={linkTextClasses}>
    ...
  </span>;

  return <nav className="bg-gray-800 py-4">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href={'/'}>Django & Next.js</Link>
        </div>
        <div className="space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">Link 1</a>
          <a href="#" className="text-gray-300 hover:text-white">Link 2</a>
          <ClientOnlyWrapper fallback={authStateLoginPlaceholder}>
            <LoginLogoutLink/>
          </ClientOnlyWrapper>
        </div>
      </div>
    </div>
  </nav>;
}