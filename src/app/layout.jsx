import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const jost = localFont({
  src: "../../public/fonts/Jost.woff2",
  variable: "--font-jost",
});

const sfPro = localFont({
  src: "../../public/fonts/SF Pro.woff2",
  variable: "--font-sf-pro",
});

export const metadata = {
  title: "Indian Motor Club | India’s Premier Luxury Car Rental Club",
  description: "A signature collection of luxury and vintage automobiles curated precisely for your journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${sfPro.variable} light`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased scroll-smooth hide-scrollbar bg-surface text-on-surface">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
