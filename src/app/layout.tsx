import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {Nav} from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SDXL Lightning - by fal.ai",
  description: "Lightning fast SDXL API demo by fal.ai",
  authors: [{ name: "Ryan Lisse", url: "https://ryanlisse.com" }],
  metadataBase: new URL("https://ryanlisse.com"),
  openGraph: {
    images: "/og_thumbnail.jpeg",
  },
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={inter.className}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100vh",
          }}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <Nav />
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
