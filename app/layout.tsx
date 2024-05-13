import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/ThemeProvider";
import { Providers } from "./Provider";
import { Toaster } from "../components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
