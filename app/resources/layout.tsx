import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downloads | SBA',
  description: 'Download section - Sunil Bhor & Associates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
