// esto es un endpoint
import { env } from "app/config/env";

export const shopifyUrls = {
  products: {
    all: `${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json`, //process.env.SHOPIFY_API_KEY: es la variable de entorno que debería contener tu token de acceso
  },
};

// urls basadas en que informacion estamos obteniendo del dominio de esa informacion, como obtener informacion de los productos, como productos filtados, oh de una categoria en espevcifico oh todos los productos
