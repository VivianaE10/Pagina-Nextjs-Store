//define una consulta (query) GraphQL llamada customerName que sirve para obtener el nombre del cliente actualmente autenticado usando su token de acceso.

import { gql } from "graphql-request";

export const customerName = gql`
  query customerName($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
    }
  }
`;
