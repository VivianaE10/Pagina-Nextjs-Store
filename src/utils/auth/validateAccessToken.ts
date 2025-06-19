"use server";
//Validación de Access Tokens  con GraphQL y Cookies
import { GraphQLClientSingleton } from "app/graphql";
import { customerName } from "app/graphql/queris/customerName";
import { cookies } from "next/headers";

export const validateAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || "";
    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
    const { customer } = await graphqlClient.request(customerName, {
      customerAccessToken: accessToken,
    });
    return customer;
  } catch (error) {
    console.error(error);
  }
};
//GraphQLClientSingleton: patrón singleton para tener una única instancia del cliente GraphQL.
//customerName: una consulta GraphQL (query) ya definida firstName y lastName
//cookies: función de Next.js para leer cookies en el servidor
//get son metodos de js
