export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav>Navegacion de las categorias</nav>
      {children}
    </main>
  );
}

//children es el contenido de las paginas
