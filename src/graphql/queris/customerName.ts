//define una consulta (query) GraphQL llamada customerName que sirve para obtener el nombre del cliente actualmente autenticado usando su token de acceso.

import { gql } from "graphql-request";

export const customerName = gql`
  query customerName($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      email
    }
  }
`;

//Este código está definiendo una consulta GraphQL llamada customerName. Lo hace usando la función gql del paquete graphql-request.
//Se usa para pedir datos del cliente autenticado usando su token de acceso.
//Retorna el nombre (firstName) y el correo electrónico (email) del usuario actual.

//query customerName(...)	Define una consulta GraphQL llamada customerName
//($customerAccessToken: String!)	Recibe un parámetro obligatorio (token)
//customer(...) { ... }	Consulta el nodo customer, usando ese token
//firstName, email	Pide que devuelva el nombre y el email del cliente
