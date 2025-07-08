import { getCollections } from "app/services/shopify/collections";
import Link from "next/link";
import styles from "./StoreLayout.module.sass";
import { ChatLink } from "app/components/Store/ChatLink";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections();

  return (
    <main className={styles.StoreLayout}>
      <h1>Explore</h1>
      <nav>
        <ul className={styles.StoreLayout__list}>
          {collections.map((collection) => (
            //navegación dinámicos para listas de categorías
            <Link
              key={collection.id}
              href={"/store/" + collection.handle}
              className={styles.StoreLayout__chip}
            >
              {collection.title}
            </Link>
          ))}
        </ul>
        <ChatLink />
      </nav>
      {children}
    </main>
  );
}

//children es el contenido de las paginas
