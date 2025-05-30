//Validación de Access Tokens  con GraphQL y Cookies

import { GraphQLClientSingleton } from "app/graphql";
import { customerName } from "./../../graphql/queris/customerName";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
  const cookiesStore = cookies();
  const AccessToken = cookiesStore.get("accessToken")?.value;
  const GraphQLClient = GraphQLClientSingleton.getInstance().getClient();
  const { customer } = await GraphQLClient.request(customerName, {
    customerAccessToken: AccessToken,
  });
  return customer;
};

//GraphQLClientSingleton: patrón singleton para tener una única instancia del cliente GraphQL.
//customerName: una consulta GraphQL (query) ya definida firstName y lastName
//cookies: función de Next.js para leer cookies en el servidor
//get son metodos de js
