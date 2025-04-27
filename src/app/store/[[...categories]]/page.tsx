import { ProductsWrapper } from "app/components/Store/ProductsWrapper";
import { getProducts } from "app/services/shopify";

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
  const products = await getProducts(); //Configura la función asíncrona para obtener productos usando tu servicio Get Products.
  const { categories } = props.params;

  // throw new Error("Error: Boom!"); // es para ver el error con la imagen que organizamos

  return <ProductsWrapper products={products} />;
}

// componente de React con TypeScript que muestra una categoría dinámica
// El valor de category cambia porque Next.js extrae dinámicamente el valor de la URL y lo pasa como params al componente.
