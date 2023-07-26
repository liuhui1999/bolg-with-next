import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import Script from 'next/script';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="lisht">
      <Component {...pageProps} />
      <Script   src='/copy.js'/>
    </ThemeProvider>
  );
};

export default MyApp;
