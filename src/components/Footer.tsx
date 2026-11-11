import { Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cafe-oscuro text-crema">
      <div className="container grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-serif text-xl font-bold">
            <Coffee aria-hidden="true" className="h-5 w-5" /> Café La Esquina
          </p>
          <p className="mt-3 text-crema/80">Tu rincón favorito del barrio.</p>
        </div>
        <div>
          <h2 className="font-semibold">Horario (ejemplo)</h2>
          <p className="mt-3 text-crema/80">Lunes a viernes: 7:30 – 20:00</p>
          <p className="text-crema/80">Sábados y domingos: 9:00 – 14:00</p>
        </div>
        <div>
          <h2 className="font-semibold">Contacto (datos ficticios)</h2>
          <p className="mt-3 text-crema/80">Teléfono: 600 000 000 (ficticio)</p>
          <p className="text-crema/80">Sin dirección física: negocio ficticio</p>
          <a href="#contacto" className="mt-2 inline-block underline underline-offset-4 hover:text-crema/80">
            Escríbenos por el formulario
          </a>
        </div>
      </div>
      <div className="border-t border-crema/15">
        <p className="container py-5 text-center text-sm text-crema/75">
          Proyecto de demostración: «Café La Esquina» es una marca ficticia. Fotografías: Unsplash (Licencia Unsplash).
        </p>
      </div>
    </footer>
  );
}
