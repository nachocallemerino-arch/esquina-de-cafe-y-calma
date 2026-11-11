import { useEffect, useState } from "react";
import { Coffee, Menu as MenuIcon, X } from "lucide-react";

const enlaces = [
  { href: "#inicio", texto: "Inicio" },
  { href: "#nosotros", texto: "Nuestra cafetería" },
  { href: "#carta", texto: "Carta" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const cerrar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-cafe/10 bg-crema/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="flex items-center gap-2 font-serif text-xl font-bold text-cafe-oscuro">
          <Coffee aria-hidden="true" className="h-6 w-6 text-oliva" />
          Café La Esquina
        </a>

        <nav aria-label="Navegación principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {enlaces.slice(1, 3).map((e) => (
              <li key={e.href}>
                <a href={e.href} className="inline-block py-2 font-medium text-tinta/80 hover:text-cafe">
                  {e.texto}
                </a>
              </li>
            ))}
            <li>
              <a href="#contacto" className="btn-primario px-5 py-2 text-sm">
                Contáctanos
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-cafe-oscuro md:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? <X className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Navegación móvil" className="border-t border-cafe/10 bg-crema md:hidden">
          <ul className="container flex flex-col py-2">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  onClick={() => setAbierto(false)}
                  className="block py-3 font-medium text-tinta hover:text-cafe"
                >
                  {e.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
