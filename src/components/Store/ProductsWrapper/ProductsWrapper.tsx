//Este componente actúa como un contenedor que agrupa todos los productos que serán mostrados.
import { ProductCard } from "../ProductCard";
import styles from "./ProductsWrapper.module.sass";

interface ProductsWrappersProps {
  products: ProductType[];
}

export const ProductsWrapper = ({ products }: ProductsWrappersProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
