//mutacion para crear un carro de compras en shopify

import { gql } from "graphql-request";

export const createCartMutation = gql`
  mutation cartCreate($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

//Esta mutación crea un carrito en el backend y, si tiene éxito, devuelve una URL de checkout. Si falla, devuelve errores para poder manejar validaciones desde el cliente.
// checkoutUrl esta es una URL pública de Shopify
