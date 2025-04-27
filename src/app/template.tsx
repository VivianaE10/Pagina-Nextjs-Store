import { Roboto } from "next/font/google";
import { Header } from "app/components/Header";
import { Footer } from "app/components/shared/Footer/Footer";
import "app/Sass/globals.sass";

const roboto = Roboto({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"], //especie de caracteres conmo el idioma
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
