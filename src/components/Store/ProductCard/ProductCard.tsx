// Este es el componente encargado de presentar cada producto. Utiliza Image y Link para mostrar la información, permitiendo la navegación hacia una página específica de cada producto.

import Link from "next/link";
import styles from "./ProductCard.module.sass";
import Image from "next/image";

interface ProductCardInterface {
  product: ProductType;
}

export const ProductCard = ({ product }: ProductCardInterface) => {
  return (
    //link nos va llevar a una pagina que se implementa llamada product.handle(viene directamente de la api de shopify) la cual utiliza el Product ID del API de Shopify para mostrar el producto específico.
    <Link
      href={`/articulo/${product.handle}?id=${product.id}`}
      className={styles.ProductCard__link}
    >
      <article className={styles.ProductCard}>
        <Image
          src={product.image}
          alt={product.title}
          quality={80}
          height={320}
          width={320}
          loading="eager"
        />
        <div className={styles.ProductCard__info}>
          <h3>{product.title}</h3>
        </div>
        <span className={styles.ProductCard__priceTag}>
          ${product.price} USD
        </span>
      </article>
    </Link>
  );
};
