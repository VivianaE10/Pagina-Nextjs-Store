//creamos las acciones tipo servidor van a correc las funciones en el servidor sin importar que el componente este en el lado del cliente

"use server";

import { GraphQLClientSingleton } from "app/graphql";
import { createCartMutation } from "app/graphql/mutations/createCartMutation";
import { createUserMutation } from "app/graphql/mutations/createUserMutation";
import { createAccessToken } from "app/utils/auth/createAccessToken";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";
import { cookies } from "next/headers";
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

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  const accesToken = await createAccessToken(
    formDataObject.email as string,
    formDataObject.password as string
  );
  if (accesToken) {
    redirect("/store");
  }
};

// genera el carrito en Shopify.
export const handleCreateCart = async (items: CartItem[]) => {
  const cookiesStore = await cookies();
  const accesToken = cookiesStore.get("accessToken")?.value;

  if (!accesToken) redirect("/login");

  const graphqlClient = GraphQLClientSingleton.getInstance().getClient();
  const customer = await validateAccessToken();
  const variables = {
    input: {
      buyerIdentity: {
        //identidad del cliente
        customerAccessToken: accesToken,
        email: customer?.email,
      },
      lines: items.map((item) => ({
        merchandiseId: item.merchandiseId, //formatear
        quantity: item.quantity,
      })),
    },
  };
  //creacion del carro
  const {
    cartCreate,
  }: {
    cartCreate?: {
      cart?: {
        checkoutUrl: string;
      };
    };
  } = await graphqlClient.request(createCartMutation, variables);

  return cartCreate?.cart?.checkoutUrl;
};
// el componente handleCreateUser
// Convierte el FormData en un objeto JavaScript (formDataObject).
// Elimina el campo password_confirmation porque no se necesita para crear el usuario.
// Prepara los datos del usuario (nombre, correo, teléfono, etc.) en un objeto variables para una mutación GraphQL.
// Envía una solicitud GraphQL usando la mutación createUserMutation para crear un nuevo usuario.
// Verifica si el usuario fue creado correctamente revisando si customerCreate.customer.firstName existe.
// Si el usuario fue creado correctamente:
// Llama a createAccessToken() para generar un token de acceso (probablemente un JWT).
// Redirige al usuario a la ruta /store.
// Si hay un error, lo imprime en consola y lo vuelve a lanzar (throw) para que pueda ser manejado externamente.

// el componente handleCreateCart
//Verifica si el usuario está autenticado.
//Prepara la información del carrito.
//Llama a una mutación GraphQL para crear el carrito.
//Devuelve la URL de checkout.
