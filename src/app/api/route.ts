//verbos que podemos implementar atraves de road handelrs

import { getProducts } from "app/services/shopify";

export async function GET() {
  const products = await getProducts();

  return Response.json({ products });
}

// Route Handlers son funciones (GET, POST, PUT, DELETE, etc.) que defines dentro de archivos route.js o route.ts para manejar peticiones HTTP directamente.
