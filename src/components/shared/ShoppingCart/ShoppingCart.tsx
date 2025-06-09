"use client";

import { FaShoppingCart } from "react-icons/fa";
import styles from "./ShoppingCart.module.sass";
import { useShoopingCart } from "app/hooks/useShoopingCart";
import { useState } from "react";

export const ShoppingCart = () => {
  const { cart } = useShoopingCart(); //Usa el hook global de Zustand (useShoopingCart) para acceder al carrito de compras (cart), que es un array de ítems.
  const [isOpen, setIsOpen] = useState(false); //Crea un estado local llamado isOpen (booleano) para controlar si se muestra o no el contenido del carrito al hacer clic.

  const handleOpen = () => setIsOpen(!isOpen); //Define una función que invierte el valor de isOpen cada vez que se ejecuta (mostrar/ocultar el carrito).

  return (
    <>
      <button className={styles.ShoppingCart} onClick={handleOpen}>
        <span className={styles.ShoppingCart__counter}>{cart.length}</span>
        <FaShoppingCart />
      </button>
      {isOpen && (
        <div className={styles.ShoppingCart__items}>
          {cart.map((item, index) => (
            <div key={`${item?.id}-${index}`}>
              <p>{item?.title}</p>
              <p>Cantidad: {item.quantity}</p>
            </div>
          ))}
          <button
            onClick={handleOpen}
            className={styles.ShoppingCart__buyButton}
          >
            Buy
          </button>
        </div>
      )}
    </>
  );
};
