//verbos que podemos implementar atraves de road handelrs

import { getProducts } from "app/services/shopify";

export async function GET() {
  const products = await getProducts();

  return Response.json({ products });
}

// Route Handlers son funciones (GET, POST, PUT, DELETE, etc.) que defines dentro de archivos route.js o route.ts para manejar peticiones HTTP directamente.
// arquitectura Back For Frontend todos los datos que lleguen del servicio getProducts sean ofuzcados(los datos de la peticion original mainProducts no aparezcan) y esto se conoce como un proceso de proxy server
//Un proxy server es como un "mensajero inteligente" que maneja las peticiones entre tú y otros servidores.
//creación de carpeta API interna con Route Handlers y Proxy Server bajo arquitectura BFF para exponer y consumir endpoints de manera segura y controlada"
