import { FC } from 'react';
import { Header } from './header';

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
