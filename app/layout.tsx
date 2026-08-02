import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dustint.dev"),
  title: "Dustin Tran — Software Engineer",
  description:
    "CS + Linguistics student at UCLA. Full-stack engineer. Currently at TetraMem.",
  openGraph: {
    title: "Dustin Tran — Software Engineer",
    description: "CS + Linguistics student at UCLA. Full-stack engineer.",
    url: "https://dustint.dev",
    siteName: "dustint.dev",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>
        <noscript>
          <style>{`.anim-nav,.hero-name,.hero-char,.hero-sub,.hero-cta,.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
