export const metadata = {
  title: 'Test',
  description: 'Stripped-down layout to debug font/cn',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: No font imports, no cn usage
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
