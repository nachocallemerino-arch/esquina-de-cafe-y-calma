import { Coffee, Croissant, Sofa } from "lucide-react";
import img600 from "@/assets/nosotros-600.webp";
import img1000 from "@/assets/nosotros-1000.webp";

const destacados = [
  { icono: Coffee, titulo: "Café de calidad", texto: "Granos seleccionados y molidos al momento para cada taza." },
  { icono: Croissant, titulo: "Recién preparado", texto: "Tostadas, bollería y tartas preparadas cada mañana." },
  { icono: Sofa, titulo: "Ambiente acogedor", texto: "Luz natural, buena música y tiempo para quedarse." },
];

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="titulo-nosotros" className="bg-crema-oscuro py-16 md:py-24">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <img
          src={img1000}
          srcSet={`${img600} 600w, ${img1000} 1000w`}
          sizes="(min-width: 768px) 45vw, 92vw"
          width={1000}
          height={700}
          loading="lazy"
          decoding="async"
          alt="Varias manos brindando con tazas de café sobre una mesa de cafetería"
          className="h-auto w-full rounded-3xl object-cover shadow-lg"
        />
        <div>
          <p className="etiqueta">Nuestra cafetería</p>
          <h2 id="titulo-nosotros" className="titulo-seccion mt-2">
            Como en casa, pero con mejor café
          </h2>
          <p className="mt-4 text-lg text-tinta/80">
            Café La Esquina nació con una idea sencilla: que el barrio tenga un lugar donde sentirse bien.
            Aquí te saludamos por tu nombre, sabemos cómo te gusta el cortado y siempre hay una mesa para
            leer, trabajar un rato o simplemente no hacer nada.
          </p>
        </div>
      </div>

      <ul className="container mt-12 grid gap-6 sm:grid-cols-3">
        {destacados.map(({ icono: Icono, titulo, texto }) => (
          <li key={titulo} className="rounded-2xl bg-crema p-6 shadow-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-oliva text-crema">
              <Icono aria-hidden="true" className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-bold text-cafe-oscuro">{titulo}</h3>
            <p className="mt-2 text-tinta/80">{texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
