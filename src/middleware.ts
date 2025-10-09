//implementar middleware en XJS para control de acceso y redirección
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/login/:path*", "/signup/:path*"], // Configura en qué rutas se ejecutará este middleware
};

// esta funcion interpreta las peticiones.
export async function middleware(request: NextRequest) {
  const cookiesStore = await cookies(); // Obtiene el objeto cookiesStore, que permite leer cookies desde el request.
  const accessToken = cookiesStore.get("accessToken")?.value; //Lee la cookie llamada "accessToken", y extrae su valor.
  if (accessToken) {
    //Verifica si la cookie accessToken existe (es decir, si el usuario ya está logueado).
    return NextResponse.redirect(new URL("/store", request.url)); //Si hay token, redirige al usuario a /store.
  }
}
//Este middleware mejora la seguridad y experiencia del usuario al evitar el acceso a formularios de autenticación si ya está logueado.
//puede ser una funion asincrona o sincrona
//Este archivo contiene la lógica que se ejecutará en cada solicitud,funcionando incluso como una especie de endpoint.
//Añadido archivo `middleware.ts` para interceptar solicitudes
// Agregada lógica de redirección a `/store` si existe `access_token` en cookies
//Configurado `matcher` para limitar ejecución a rutas `/login` y `/signup`
// Añadido manejo de cookies con utilidades de Next.js
