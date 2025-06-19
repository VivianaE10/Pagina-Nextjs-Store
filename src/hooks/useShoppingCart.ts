//useShoppingCart, que usa Zustand para manejar el estado global del carrito de compras y sincronizarlo con localStorage.

import { create } from "zustand";

type Store = {
  cart: CartItem[]; //Un array de ítems en el carrito
  addToCart: (cartItem: CartItem) => void; // Función para agregar ítems al carrito
  removeCartItem: (cartItem: CartItem) => void;
};

//Esta función recibe un arreglo de productos (CartItem[]) y lo guarda en localStorage con la clave "cart" convertido en JSON.
const saveArrayToLocalStorage = (array: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(array));
};

export const useShoppingCart = create<Store>()((set) => ({
  //set permite actualizar el estado
  cart: (() => {
    if (typeof window === "undefined") {
      //Si está en el servidor (window === undefined), devuelve un array vacío.
      return [];
    }
    //Este bloque de código es parte del estado inicial del carrito, asegura que cada producto cargado del localStorage tenga al menos un campo merchandiseId (aunque sea vacío),
    const cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(cart).map((item: any) => ({
        ...item,
        merchandiseId: item.merchandiseId || "", // ← o lanza advertencia si falta
      }));
    }

    return [];
  })(),

  //Función para agregar productos
  addToCart: (cartItem: CartItem) =>
    set((state) => {
      const currentCart = state.cart; //Obtiene el carrito actual del estado.

      //Verifica si el producto ya existe en el carrito (por id).
      const itemExists = currentCart.find((item) => item.id === cartItem.id);

      //Si ya existe, lo reemplaza con el nuevo (cartItem) usando map.
      const replaceExistingItem = currentCart.map((item) => {
        if (item.id === cartItem.id) {
          return cartItem;
        }
        return item;
      });
      //Si el producto ya estaba, lo actualiza en el carrito y en el localStorage, y retorna el nuevo estado.
      if (itemExists) {
        saveArrayToLocalStorage(replaceExistingItem);
        return { cart: replaceExistingItem };
      }
      //Si no estaba, agrega el nuevo producto al array, guarda en localStorage y actualiza el estado global.
      saveArrayToLocalStorage([...state.cart, cartItem]);
      return { cart: [...state.cart, cartItem] };
    }),

  //Función para eliminar productos
  removeCartItem: (cartItem: CartItem) =>
    set((state) => {
      const currentCart = state.cart;
      const newCart = currentCart.filter((item) => item.id !== cartItem.id);
      saveArrayToLocalStorage(newCart);
      return { cart: newCart };
    }),
}));

//Inicializa el carrito desde localStorage.
//Agrega o reemplaza productos.
//Elimina productos.
//Sincroniza el estado global con el almacenamiento local para que se mantenga entre recargas.
