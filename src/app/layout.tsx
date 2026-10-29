import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/features/common/components/Navbar";
import { Footer } from "@/features/common/components/Footer";

export const metadata: Metadata = {
  title: "VinilosMilo - Tienda de Vinilos y CDs",
  description: "VinilosMilo, tienda de discos en vinilo y CD: reggaeton, rock, salsa y musica alternativa.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#f9f9f9] text-[#333333]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
