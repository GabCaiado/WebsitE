import '@styles/globals.css';

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const LoginLayout = ({ children }) => {
  return (
    <html lang="en" className={`${poppins.className}`}>
      <body className="h-full bg-black text-gray-400">
          <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default LoginLayout;
