//fetchin paralelo Permite realizar múltiples solicitudes al mismo tiempo, sin que una dependa de la otra.

import { env } from "app/config/env";
import { shopifyUrls } from "./urls";

export const getCollections = async () => {
  try {
    const response = await fetch(shopifyUrls.collections.all, {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      }),
    });
    const { smart_collections } = await response.json();
    const transformedCollections = smart_collections.map((collection: any) => {
      return {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      };
    });
    return transformedCollections;
  } catch (error) {
    console.log(error);
  }
};
// voy a traer los productos de las colecciones
export const getCollectionProducts = async (id: string) => {
  try {
    const response = await fetch(shopifyUrls.collections.products(id), {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      }),
    });
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};
//los headers son información adicional que se envia junto con tu solicitud HTTP (fetch) para decirle al servidor cómo tratar tu petición.
//header "Hola Shopify, yo sí tengo permiso para pedir esta información."
