// tiene todos los valores de las variables entornos

export const env = {
  SHOPIFY_TOKEN: process.env.SHOPIFY_TOKEN || "",

  SHOPIFY_HOSTNAME: process.env.SHOPIFY_HOSTNAME || "",

  SHOPIFY_GRAPHQL_ENDPOINT: process.env.SHOPIFY_GRAPHQL_ENDPOINT as string,

  SHOPIFY_STOREFRONT_TOKEN: process.env.SHOPIFY_STOREFRONT_TOKEN as string,
};
