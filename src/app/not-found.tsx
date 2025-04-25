"use client";

import Image from "next/image";
import styles from "app/Sass/not-found.module.sass";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className={styles.NotFound}>
      <h1 className={styles.NotFound__title}>404</h1>

      <Image src="/images/404.png" width={500} height={500} alt="404" />

      <h2 className={styles.NotFound__subtitle}>
        Uy parece que el enlace se escondio!
      </h2>

      <p className={styles.NotFound__message}>
        Pero nuestra tienda esta abierta las 24/7
      </p>

      <Link className={styles.NotFound__link} href={"/store"}>
        ¡Vamos de compras
      </Link>
    </main>
  );
}
