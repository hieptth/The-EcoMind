import type { Metadata } from "next";
import "./globals.scss";
import { ReactNode } from "react";
import { Raleway } from "next/font/google";

const font = Raleway({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The EcoMind",
  description: "Online real estate platform to bridge the gap between buyers and sellers",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        rel: "icon",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
