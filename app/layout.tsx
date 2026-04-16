import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import PageTransition from "@/components/ui/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: 'swap' });

export const metadata: Metadata = {
  title: "Nutrissé GT | Transforma tu salud desde adentro",
  description: "Nutrición funcional y personalizada para alcanzar tu bienestar real",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} bg-nutrisse-warmWhite text-nutrisse-charcoal font-sans antialiased`}
      >
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
