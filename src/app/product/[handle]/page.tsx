import { ProductView } from "app/components/product/productView";
import { getProducts } from "app/services/shopify/products";
import { redirect } from "next/navigation";

interface ProductPageProps {
  searchParams: {
    id: string;
  };
}

//metadato dinamico y open graph para el seo

export async function generateMetadata({ searchParams }: ProductPageProps) {
  const id = searchParams.id;

  const products = await getProducts(id);
  const product = products[0];

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      //Open Graph mejora la apariencia de tu sitio cuando se comparte
      images: [product.image],
    },
  };
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const id = searchParams.id;
  if (!id) redirect("/");

  const products = await getProducts(id);
  const product = products[0];

  const variantId = product.variants?.edges?.[0]?.node?.id;

  const productWithVariant = {
    ...product,
    merchandiseId: variantId,
  };

  return <ProductView product={productWithVariant} />;
}
