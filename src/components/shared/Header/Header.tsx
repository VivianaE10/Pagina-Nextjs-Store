import Link from "next/link";
import styles from "./Header.module.sass";
import { validateAccessToken } from "app/utils/auth/validateAccessToken";
import ClientShoppingCart from "./ClientShoppingCart";

export const Header = async () => {
  const customer = await validateAccessToken();

  return (
    <header className={styles.Header}>
      <nav>
        <ul className={styles.Header__list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Store</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.Header__user}>
        {customer?.firstName ? (
          <p>Hola! {customer.firstName}</p>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <ClientShoppingCart />
      </div>
    </header>
  );
};

//Si el usuario esta autenticado (token), muestra Hola! y elnombre del usuario
// Si NO hay token, muestra <Link href="/login">Login</Link>
// Así que si tú estás logueado (y el token existe), NO se va a mostrar el link de login. Eso es lo correcto.
//Verificar al usuario desde el servidor.
//Mostrar enlaces (Link).
//sirve para incluir componentes del navegador como el carrito (ShoppingCart)
