import { ProductView } from "app/components/product/productView";
import { getProducts } from "app/services/shopify/products";
import { redirect } from "next/navigation";

interface ProductPageProps {
  searchParams?: any;
}

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const params = await searchParams; // 🔹 se espera la promesa
  const id = params?.id;

  const products = await getProducts(id);
  const product = products[0];

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams; // 🔹 se espera la promesa
  const id = params?.id;

  const products = await getProducts(id);
  const product = products[0];

  if (!id) {
    redirect("/");
  }

  return <ProductView product={product} />;
}
