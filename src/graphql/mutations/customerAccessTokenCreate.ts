//iniciar sesión (login)
//Envía una solicitud para autenticar a un cliente con su email y password.
//Si las credenciales son correctas, el servidor responde con un token de acceso (accessToken) y una fecha de expiración (expiresAt).

import { gql } from "graphql-request";

export const customerAccessTokenCreateMutation = gql`
  mutation customerAccessTokenCreate($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        message
      }
    }
  }
`;
