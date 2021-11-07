import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const NoopLayout = (page: ReactElement) => page;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const renderLayout = Component?.getLayout ?? NoopLayout;

  return renderLayout(<Component {...pageProps} />);
}

export default MyApp;
