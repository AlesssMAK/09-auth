import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['600'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'NoteHub is an intuitive and reliable application developed to efficiently organize, manage, and access personal notes.',
  openGraph: {
    title: 'NoteHub',
    description:
      'NoteHub is an intuitive and reliable application developed to efficiently organize, manage, and access personal notes.',
    url: 'https://08-zustand-three-delta.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHUb',
      },
    ],
    type: 'article',
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {modal}
            {children}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
