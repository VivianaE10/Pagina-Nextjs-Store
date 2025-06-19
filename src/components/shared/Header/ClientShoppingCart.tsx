"use client"; // se renderiza solo del lado del cliente

import dynamic from "next/dynamic";

// Dinámicamente importa el ShoppingCart sin SSR
const NoSSRShoppingCart = dynamic(() => import("../ShoppingCart"), {
  ssr: false,
});

export default function ClientShoppingCart() {
  return <NoSSRShoppingCart />;
}

//dynamic(() => import(...), { ssr: false }) le dice a Next que este componente no debe renderizarse en el servidor, sino solo en el navegador.
//Esto es útil cuando el componente depende de cosas como window, localStorage, o hooks de estado (useState, useEffect, etc.).
//Permite usar un componente que solo puede funcionar en el navegador (como el carrito) dentro de otros componentes más generales que se renderizan en el servidor, sin romper las reglas de Next.js.
