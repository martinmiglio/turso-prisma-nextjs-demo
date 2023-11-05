import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turso + Prisma Demo on NextJS",
  description: "Turso + Prisma Demo on NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + " flex w-screen items-center justify-center"
        }
      >
        {children}
      </body>
    </html>
  );
}
