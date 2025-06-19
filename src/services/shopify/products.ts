//aca van todas las llamdas que estemos realizando para obtener todos los producto
import { env } from "app/config/env";
import { shopifyUrls } from "./urls";

export const getProducts = async (id?: string): Promise<ProductType[]> => {
  try {
    const apiUrl = id
      ? `${shopifyUrls.products.all}?ids=${id}`
      : shopifyUrls.products.all;
    const response = await fetch(apiUrl, {
      headers: new Headers({
        "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
      }),
    });

    const { products } = await response.json();

    //Esto toma la respuesta original de Shopify (llamada products) y transforma cada producto en un nuevo objeto con los campos exactos que tú necesitas en tu app.
    const transformedProducts = products.map((product: any) => {
      return {
        id: product.id,
        gql_id: product.variants?.[0]?.admin_graphql_api_id || "", // transforma los productos desde la API de Shopify
        title: product.title,
        description: product.body_html,
        price: product.variants[0].price,
        image: product.images[0].src,
        quantity: product.variants[0].inventory_quantity,
        handle: product.handle,
        tags: product.tags,
      };
    });
    return transformedProducts;
  } catch (error) {
    console.log(error);
  }
};

export const getMainProducts = async () => {
  const response = await fetch(shopifyUrls.products.mainProducts, {
    headers: new Headers({
      "X-Shopify-Access-Token": env.SHOPIFY_TOKEN,
    }),
  });

  const { products } = await response.json();

  return products;
};
