import hero600 from "@/assets/hero-600.webp";
import hero1000 from "@/assets/hero-1000.webp";

export default function Hero() {
  return (
    <section id="inicio" aria-labelledby="titulo-hero" className="overflow-hidden">
      <div className="container grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="etiqueta">Cafetería de barrio</p>
          <h1
            id="titulo-hero"
            className="mt-3 font-serif text-4xl font-bold leading-tight text-cafe-oscuro sm:text-5xl lg:text-6xl"
          >
            Tu rincón favorito del barrio
          </h1>
          <p className="mt-5 max-w-prose text-lg text-tinta/80">
            Café recién molido, desayunos hechos al momento y dulces caseros. Un sitio tranquilo para
            empezar el día, charlar con los vecinos o tomarte un respiro por la tarde.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#carta" className="btn-primario">
              Descubre nuestra carta
            </a>
            <a href="#contacto" className="btn-secundario">
              Escríbenos
            </a>
          </div>
        </div>
        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rotate-2 rounded-3xl bg-oliva/20" />
          <img
            src={hero1000}
            srcSet={`${hero600} 600w, ${hero1000} 1000w`}
            sizes="(min-width: 768px) 45vw, 92vw"
            width={1000}
            height={1266}
            alt="Tres tazas de café con arte latte sobre una mesa de madera, rodeadas de plantas"
            fetchPriority="high"
            className="aspect-[4/5] max-h-[560px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
