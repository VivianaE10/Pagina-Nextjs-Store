// import Image from "next/image";
// "use client"; pagina de timpo cliente
import { MainProducts } from "app/components/home/MainProducts/MainProducts";
import { Metadata } from "next";

//implementacion de metadatos estaticos para mejorar el seo
export const metadata: Metadata = {
  title: "✨ Futute worl",
  description: "Welcome to the future worl, an ecommerce from other century",
  keywords: ["ecommerce", "future", "world", "tecnology"],
};

export default function Home() {
  return (
    <main>
      <MainProducts />
    </main>
  );
}
