import { ProductsWrapper } from "app/components/Store/ProductsWrapper";
import {
  getCollectionProducts,
  getCollections,
} from "app/services/shopify/collections";
import { getProducts } from "app/services/shopify/products";

interface CategoryProps {
  params: {
    categories: string[];

    searhParams?: string;
  };
}

//Para que las colecciones que has creado sean efectivas, necesitas hacer que tu tienda las consuma e integre, permitiendo navegar por categorías específicas.
//Importar y utilizar el componente de categorías
//Importa el componente ProductsCategory dentro de tu página de Store.
//Configurar la petición de productos:Haz uso de un async function para obtener productos y pasar estos datos al ProductWrapper.

export default async function Category(props: CategoryProps) {
  const { categories } = props.params;
  let products = [];
  const collections = await getCollections();

  if (categories?.length > 0) {
    const selectedCollectionId = collections.find(
      (collection) => collection.handle === categories[0]
    ).id;
    products = await getCollectionProducts(selectedCollectionId);
  } else {
    products = await getProducts();
  }

  console.log("products", products);

  return <ProductsWrapper products={products} />;
}

// throw new Error("Error: Boom!"); // es para ver el error con la imagen que organizamos

// componente de React con TypeScript que muestra una categoría dinámica
// El valor de category cambia porque Next.js extrae dinámicamente el valor de la URL y lo pasa como params al componente.
