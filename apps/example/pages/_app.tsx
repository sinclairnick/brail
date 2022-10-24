import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { BrailLayout } from '@brail/web';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to example!</title>
      </Head>
      <BrailLayout template={Component}>
        <Component />
      </BrailLayout>
    </>
  );
}

export default CustomApp;
