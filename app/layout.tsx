import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Half-Life — Autonomous Creative Fatigue Detection for Creators',
  description:
    'A persistent Minds Agent that detects when winning content formats begin to decay, projecting half-life curves and autonomously alerting creators before audience churn hits.',
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
