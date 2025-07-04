"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useShoppingCart } from "app/hooks/useShoppingCart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { handleCreateCart } from "app/actions";
import styles from "./ShoppingCart.module.sass";

export default function ShoppingCart() {
  const { cart } = useShoppingCart();
  const [isBuying, setIsBuying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const hasItems = cart.length > 0;

  const handleOpen = () => {
    if (hasItems) {
      setIsOpen(!isOpen);
    }
  };

  // lógica para limpiar el carrito tras una compra exitosa.
  const handleBuy = async () => {
    try {
      setIsBuying(true); //// Indicador visual de que se está procesando la compra
      const checkoutUrl = await handleCreateCart(cart); // // Crea el carrito en Shopify y obtiene la URL de pago
      if (!checkoutUrl) throw new Error("Error creating checkout");
      window.localStorage.removeItem("cart"); //Elimina completamente el carrito que estaba almacenado en localStorage bajo la clave "shopping-cart"
      window.location.href = checkoutUrl; //checkout es la Url generada por shopify para redirigir al usuario al proceso de pago.
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className={styles.ShoppingCart}>
      {hasItems && (
        <span className={styles.ShoppingCart__counter}>{cart.length}</span>
      )}
      <button className={styles.ShoppingCart__cart} onClick={handleOpen}>
        <FaShoppingCart />
      </button>
      {isOpen && hasItems && (
        <div className={styles.ShoppingCart__items}>
          {cart.map((item) => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button
            onClick={handleBuy}
            className={styles.ShoppingCart__buyButton}
            disabled={isBuying}
          >
            Buy
          </button>
        </div>
      )}
    </div>
  );
}
