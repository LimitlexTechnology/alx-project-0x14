import { ComponentProps } from '@/interfaces';
import Header from './Header';
import Footer from './Footer';
import React from 'react';

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
