import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { APP_NAME } from '@utils/constant';
import { use } from 'react';

export const metadata = {
  title: APP_NAME,
  description: 'Discover & share AI Prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
