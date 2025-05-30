"use server";

import { GraphQLClientSingleton } from "app/graphql";
import { customerAccessTokenCreateMutation } from "app/graphql/mutations/customerAccessTokenCreate";
import { cookies } from "next/headers";

export const createAccessToken = async (email: string, password: string) => {
  const cookiesStore = cookies();
  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const { customerAccessTokenCreate } = await graphqlClient.request(
    customerAccessTokenCreateMutation,
    {
      email: email,
      password: password,
    }
  );

  const { accessToken, expiresAt } =
    customerAccessTokenCreate?.customerAccessToken;

  if (accessToken) {
    cookiesStore.set("accessToken", accessToken, {
      path: "/",
      expires: new Date(expiresAt),
      httpOnly: true,
      sameSite: "strict",
    });

    return accessToken;
  }
};

//accessToken esta al macenado en una cookie donde se puede utilizar en cualquier parte de ka aplicacion
//uso traer la informacion del usuario
//si el accessToken es valido es obetner la imnformacion del usuario con accessToken
//tengo archivos GRAPHQL porque estoy usando consultas/mutaciones/esquemas GraphQL en tu cliente o servidor.
