export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className="bg-background">
          <main className="flex min-h-screen items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    )
  }