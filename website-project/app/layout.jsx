import '@styles/globals.css';

import Nav from '@components/Nav';
import Providers from './providers';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: "WebsitE",
  description: 'Buying Gift-Cards has never been this easier!'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="h-full bg-black text-gray-400">
        <Providers>
          <Nav />
          <main className="app">{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
