import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Awards and Recognition | SBA',
  description: 'Awards and Recognition of Sunil Bhor & Associates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
