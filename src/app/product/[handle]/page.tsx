import { ProductView } from "app/components/product/productView";
import { getProducts } from "app/services/shopify/products";
import { redirect } from "next/navigation";

interface ProductPageProps {
  searchParams: {
    id: string;
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const id = searchParams.id;
  const products = await getProducts(id);
  const product = products[0];

  if (!id) {
    redirect("/"); //redireccioando a la pagina principal desde el producto, cuando le eliminamos el id en la url
  }

  return <ProductView product={product} />;
}
