import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import { ThemeProvider } from "@/context/themeContext";
import { Providers } from "@/context/themeProvider";
import { GlobalPageLoader, } from "./components/pageLoader";
import { ChatProvider } from "@/context/chatProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Real Estate Agency",
  description: "Premium Real Estate Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light antialiased" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
      <ChatProvider>
        <Providers>
          <div className="lg:flex">
            {/* Conteúdo principal */}
            <div className="w-full h-full">
              <main className=" min-h-screen">
              <GlobalPageLoader />
                {children}
              </main>
            </div>
          </div>
        </Providers>
        </ChatProvider>
      </body>
    </html>
  );
}
