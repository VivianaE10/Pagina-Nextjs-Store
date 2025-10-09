import { NewAccountForm } from "app/components/signup/NewAccountForm";

export const dynamic = "force-dynamic"; // le indica a Next.js que esa página no se debe generar estáticamente, sino que debe renderizarse dinámicamente en el servidor cada vez que alguien la visita.

export default function NewAccountPage() {
  return <NewAccountForm />;
}
