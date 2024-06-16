import {Inter} from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'Django & Next.js Starter Template',
  description: 'Created by Jibran',
};

export default function RootLayout({children}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Navigation/>
      {children}
      </body>
      </html>
  );
}
