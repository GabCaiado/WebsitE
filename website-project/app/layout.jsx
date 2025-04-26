import '@styles/globals.css';

import Nav from '@components/Nav';

import { Poppins, Roboto } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // set multiple font weights
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
    title: "WebsitE",
    description: 'Buying Gift-Cards has never been this easier!'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en' className={`${poppins.className}`}>
      <body className="h-full bg-black text-gray-400">
        <Nav />
        <main className="app">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout
