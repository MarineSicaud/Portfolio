import type { Metadata } from "next";
import { Poppins, Caprasimo } from "next/font/google";
import "../style/style.scss"
import "../style/responcive.scss"
import { Footer } from "@/component/global/footer";

const caprasimo = Caprasimo({
  weight: "400",
  variable: "--font-caprasimo",
});

const poppins = Poppins({
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Marine Sicaud",
  icons: {
    icon: "/images/logo.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${caprasimo.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
