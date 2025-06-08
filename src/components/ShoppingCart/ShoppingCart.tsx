"use client";

import { FaShoppingCart } from "react-icons/fa";
import styles from "./ShoppingCart.module.sass";
import { useShoopingCart } from "app/hooks/useShoopingCart";

export const ShoppingCart = () => {
  const { cart } = useShoopingCart();

  return (
    <button className={styles.ShoppingCart}>
      <span className={styles.ShoppingCart__counter}>{cart.length}</span>
      <FaShoppingCart />
    </button>
  );
};
