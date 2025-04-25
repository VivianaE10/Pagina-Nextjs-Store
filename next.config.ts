import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")], // Ruta donde están los archivos Sass
    additionalData: `@import "main.sass";`,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.shopify.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;

// Qué logra este codigo
// Permite usar Sass de forma más organizada.
// Añade un archivo global (main.sass) a todos los estilos automáticamente.
// Habilita carga de imágenes desde Shopify (cdn.shopify.com).
