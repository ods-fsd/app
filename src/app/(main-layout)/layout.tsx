import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import css from './layout.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.pageWrapper}>
      <Header />
      {/* Клас mainContent гарантує, що футер завжди буде внизу екрана */}
      <main className={css.mainContent}>{children}</main>
      <Footer />
    </div>
  );
}
