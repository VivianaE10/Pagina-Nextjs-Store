import Link from "next/link";
import styles from "./Header.module.css";
import { cookies } from "next/headers";

export const Header = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("accessToken")?.value;
  return (
    <header>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
        </ul>
        {token ? <p>Hola!</p> : <Link href="/login">Login</Link>}
      </nav>
    </header>
  );
};

//Si hay token, muestra Hola!
// Si NO hay token, muestra <Link href="/login">Login</Link>
// Así que si tú estás logueado (y el token existe), NO se va a mostrar el link de login. Eso es lo correcto.
