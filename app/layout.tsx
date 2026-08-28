import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Half-Life — Autonomous Creative Fatigue Detection for Creators',
  description: 'HalfLife | Autonoumous Creative Fatigue Detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-sans antialiased min-h-screen selection:bg-accent selection:text-paper">
        {children}
      </body>
    </html>
  );
}
