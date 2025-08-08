export const metadata = {
  title: 'Test',
  description: 'Stripped-down layout to debug font/cn issues',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // IMPORTANT: No font imports, no cn usage — this is only for debugging
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
