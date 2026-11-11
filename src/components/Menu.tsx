import { carta, formatoPrecio } from "@/data/menu";
import img800 from "@/assets/carta-800.webp";
import img1400 from "@/assets/carta-1400.webp";

export default function Menu() {
  return (
    <section id="carta" aria-labelledby="titulo-carta" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <p className="etiqueta">La carta</p>
          <h2 id="titulo-carta" className="titulo-seccion mt-2">
            Para cada momento del día
          </h2>
        </div>

        <img
          src={img1400}
          srcSet={`${img800} 800w, ${img1400} 1400w`}
          sizes="(min-width: 1200px) 1168px, 92vw"
          width={1400}
          height={600}
          loading="lazy"
          decoding="async"
          alt="Cruasanes recién horneados espolvoreados con azúcar glas"
          className="mt-10 aspect-[2/1] w-full rounded-3xl object-cover shadow-lg md:aspect-[7/3]"
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {carta.map((cat) => (
            <article
              key={cat.id}
              aria-labelledby={`cat-${cat.id}`}
              className="rounded-2xl border border-cafe/10 bg-white/60 p-6"
            >
              <h3
                id={`cat-${cat.id}`}
                className="border-b-2 border-oliva pb-3 font-serif text-2xl font-bold text-cafe-oscuro"
              >
                {cat.titulo}
              </h3>
              <ul className="mt-4 divide-y divide-cafe/10">
                {cat.productos.map((p) => (
                  <li key={p.nombre} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-tinta">{p.nombre}</p>
                      <p className="text-sm text-tinta/75">{p.descripcion}</p>
                    </div>
                    <span className="shrink-0 font-semibold text-cafe">{formatoPrecio(p.precio)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-tinta/75">Precios orientativos de demostración, IVA incluido.</p>
      </div>
    </section>
  );
}
