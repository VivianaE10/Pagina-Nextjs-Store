interface CategoryProps {
  params: {
    categories: string[];

    searhParams?: string;
  };
}

export default function Category(props: CategoryProps) {
  const { categories } = props.params;

  // throw new Error("Error: Boom!"); // es para ver el error con la imagen que organizamos

  return <h1>Categoria dinamica : {categories}</h1>;
}

// componente de React con TypeScript que muestra una categoría dinámica
// El valor de category cambia porque Next.js extrae dinámicamente el valor de la URL y lo pasa como params al componente.
