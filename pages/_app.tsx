import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';
import NextHead from 'next/head';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const NoopLayout = (page: ReactElement) => page;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const renderLayout = Component?.getLayout ?? NoopLayout;

  return (
    <>
      <NextHead>
        <title>Next-HN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Next.js powered Hacker News App" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      {renderLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
