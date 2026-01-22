import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications and Licenses | SBA',
  description: 'Certifications and Licenses of Sunil Bhor & Associates',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
