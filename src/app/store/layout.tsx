import { getCollections } from "app/services/shopify/collections";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections();

  return (
    <main>
      <h1>Explore</h1>
      <nav>
        <ul>
          {collections.map((collection) => (
            <Link key={collection.id} href={'/store/' + collection.handle}>
              {collection.title}
            </Link>
          ))}
        </ul>
      </nav>
      {children}
    </main>
  );
}

//children es el contenido de las paginas
