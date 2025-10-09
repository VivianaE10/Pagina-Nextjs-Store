import { getMainProducts } from "app/services/shopify/products";
import Image from "next/image";
import styles from "./MainProducts.module.sass";

export const MainProducts = async () => {
  const products = await getMainProducts();

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: any) => {
          const imageSrc = product.images[0].src;
          return (
            <article key={product.id}>
              <p>{product.title}</p>
              <Image src={imageSrc} fill alt={product.title} loading="eager" />
            </article>
          );
        })}
      </div>
    </section>
  );
};

// creacion de carpeta services para poner todos los endpoint  y servicios en general que vamos a consumir de manera externa (urls) y otra carpeta llamada config donde estan todas las variables de entorno y en el scprit index.ts van todas las llamdas que estemos realizando
