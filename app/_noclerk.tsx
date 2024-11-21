// pages/_app.tsx

import { AppProps } from 'next/app'; // Import AppProps for TypeScript support
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css'; // Import your global styles if any

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <ClerkProvider
      frontendApi={isDevelopment ? undefined : process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;