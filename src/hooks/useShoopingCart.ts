import { create } from "zustand";

type Store = {
  cart: CartItem[]; //Un array de ítems en el carrito
  addToCart: (cartItem: CartItem) => void; // Función para agregar ítems al carrito
};

// useShoopingCart es un hook personalizado de zustand
export const useShoopingCart = create<Store>()((set) => ({
  cart: [], // Estado inicial: carrito vacío
  addToCart: (cartItem: CartItem) =>
    set((state) => ({ cart: [...state.cart, cartItem] })), // Agrega el nuevo ítem al array actual
}));

//Para manejar el carrito de compras de forma global y verse reflejado en el componente de carrito de compras
//Puedes acceder o actualizar el carrito desde cualquier componente, sin pasar props.
