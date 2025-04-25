import Image from "next/image";
import styles from "./MainProducts.module.sass";

const getProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json`, //process.env.SHOPIFY_API_KEY: es la variable de entorno que debería contener tu token de acceso
      {
        headers: new Headers({
          "X-Shopify-Access-Token": process.env.SHOPIFY_API_KEY || "", // Usamos un valor por defecto (fallback) para evitar errores si la variable está vacía
        }),
      }
    );
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const MainProducts = async () => {
  const products = await getProducts();

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product) => {
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
