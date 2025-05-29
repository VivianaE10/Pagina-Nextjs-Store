//creamos las acciones tipo servidor van a correc las funciones en el servidor sin importar que el componente este en el lado del cliente

"use server";

import { GraphQLClientSingleton } from "app/graphql";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { redirect } from "next/navigation";

export const handleCreateUser = async (formData: FormData) => {
  try {
    const formDataObject = Object.fromEntries(formData);
    delete formDataObject["password_confirmation"];

    const graphqlClient = GraphQLClientSingleton.getInstance().getClient();

    const variables = {
      input: {
        firstName: formDataObject.firstName,
        lastName: formDataObject.lastName,
        email: formDataObject.email,
        password: formDataObject.password,
        phone: formDataObject.phone ? "+52" + formDataObject.phone : null,
      },
    };

    const { customerCreate } = await graphqlClient.request(
      createUserMutation,
      variables
    );

    console.log("Respuesta GraphQL:", customerCreate);

    if (customerCreate?.customer?.firstName) {
      await createAccessToken(
        formDataObject.email as string,
        formDataObject.password as string
      );
      redirect("/store");
    }

    return customerCreate;
  } catch (error: any) {
    console.error("❌ Error al crear usuario:", error);
    throw error;
  }
};
