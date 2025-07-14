import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/sass")], // Ruta donde están los archivos Sass
    additionalData: '@import "main.sass";',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
// Qué logra este codigo
// Permite usar Sass de forma más organizada.
// Añade un archivo global (main.sass) a todos los estilos automáticamente.
// Habilita carga de imágenes desde Shopify (cdn.shopify.com).
