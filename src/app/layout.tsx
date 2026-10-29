// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';

export const metadata: Metadata = {
  title: 'VinilosMilo — Tienda de Vinilos y CDs',
  description: 'VinilosMilo, tienda de discos en vinilo y CD: reggaetón, rock, salsa y música alternativa.',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#333333]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
