"use client";
import { SyntheticEvent, useState } from "react";
import styles from "./ProductViewItemsOrder.module.sass";
import { FaCartShopping } from "react-icons/fa6";
import { useShoppingCart } from "app/hooks/useShoppingCart";

interface ProductViewItemsOrderProps {
  maxQuantity: number;
  product: ProductType;
}

export const ProductViewItemsOrder = ({
  maxQuantity,
  product,
}: ProductViewItemsOrderProps) => {
  const [counter, setCounter] = useState(1);
  const { addToCart } = useShoppingCart();

  const handleAddToCart = (event: SyntheticEvent) => {
    event.preventDefault(); //Evita que el formulario (o el botón que llamó esta función) recargue la página.
    addToCart({
      //Llama a la función global que tienes en tu hook useShoppingCart, para agregar un producto al carrito.
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: counter,
      image: product.image,
      merchandiseId: product.gql_id, //	Clave para Shopify. Es el ID único de una variante (no del producto general)
    });
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleSubtract = (event: SyntheticEvent) => {
    event.preventDefault();
    if (counter === 1) return;
    setCounter(counter - 1);
  };

  const handleAdd = (event: SyntheticEvent) => {
    event.preventDefault();
    if (counter === maxQuantity) return;
    setCounter(counter + 1);
  };

  return (
    <div className={styles.ProductViewItemsOrder}>
      <div className={styles.ProductViewItemsOrder__itemsCount}>
        <button onClick={handleSubtract}>-</button>
        <p>{counter}</p>
        <button onClick={handleAdd}>+</button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.ProductViewItemsOrder__form}
      >
        <button
          className={styles.ProductViewItemsOrder__submit}
          type="submit"
          onClick={handleAddToCart}
        >
          <FaCartShopping />
          <span>Add to cart</span>
        </button>
      </form>
    </div>
  );
};

//El merchandiseId es el identificador único de una variante, no del producto general.pasar merchandiseId con el valor de gql_id, que asumes que es el ID GraphQL de la variante del producto
//Validaste que gql_id (el merchandiseId) estuviera definido antes de agregarlo al carrito.
//gql_id	ID de variante (ProductVariant)	Lo usas para identificar la variante con GraphQL----Lo extraes de Shopify
//merchandiseId	ID requerido en cartCreate	Es el valor que Shopify necesita en la mutación-----Se lo das a Shopify
