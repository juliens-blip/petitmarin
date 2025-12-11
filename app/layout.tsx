import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NaviGuide - Formation à l'Achat de Bateaux",
  description: "Devenez propriétaire de votre bateau en toute confiance avec NaviGuide. Formation complète pour réussir votre achat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
