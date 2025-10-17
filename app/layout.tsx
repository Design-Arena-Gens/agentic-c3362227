import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import SeedOnFirstRun from './seed';

export const metadata: Metadata = {
  title: 'Air.inc Clone',
  description: 'Google Drive for brands: manage static and video ads',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <SeedOnFirstRun />
        {children}
      </body>
    </html>
  );
}
