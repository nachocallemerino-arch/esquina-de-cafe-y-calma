# Esquina De Cafe Y Calma

Build a single-page landing for a fictional neighborhood café, "Café La Esquina". The code is ALREADY WRITTEN and tested: reproduce it EXACTLY as given below. Do not redesign, do not rewrite copy, do not add features, routes, backend, database, auth or Supabase. Front-end only, React + TypeScript + Tailwind.

RULES
1. Copy the 6 attached images into `src/assets/` keeping their EXACT file names: hero-1000.webp, hero-600.webp, nosotros-1000.webp, nosotros-600.webp, carta-1400.webp, carta-800.webp.
2. Create every file below with identical content. Imports use the `@/` alias for `src/`.
3. The whole page is `<App />` below. If the scaffold uses a router or a different entry point (e.g. src/pages/Index.tsx or a routes/index file), render the App content as the home page ("/") and remove the placeholder home content. Do not keep other demo pages.
4. Theme: add the custom colors and fonts below to the Tailwind theme (tailwind.config.ts if Tailwind v3; if the project uses Tailwind v4, define the same tokens with @theme in the CSS, so classes like `bg-crema`, `text-cafe-oscuro`, `bg-oliva`, `text-tinta`, `font-serif` work). The component classes `.btn-primario`, `.btn-secundario`, `.titulo-seccion`, `.etiqueta` must work; if `@apply btn` is not allowed in your Tailwind version, inline the `.btn` utilities into `.btn-primario` and `.btn-secundario`. Remove any conflicting default body background/text colors from the template.
5. index.html: `lang="es"`, title "Café La Esquina · Tu rincón favorito del barrio", meta description "Café La Esquina: cafetería de barrio con café de calidad, desayunos y dulces recién preparados en un ambiente acogedor. Proyecto de demostración.", og:title, og:description "Café de calidad, desayunos y dulces recién preparados en un ambiente acogedor.", og:type website, theme-color #5B3A29, and Google Fonts links: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap (with preconnects). Remove Lovable placeholder meta/og images.
6. Dependency needed: lucide-react (already in the template normally).

=== Theme tokens (tailwind.config.ts, theme.extend) ===
container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } }
colors: {
  crema: { DEFAULT: "#F7F1E6", oscuro: "#EFE5D3" },
  cafe: { DEFAULT: "#5B3A29", claro: "#8A5A3C", oscuro: "#3B2418" },
  oliva: { DEFAULT: "#5E6B3A", claro: "#7C8A4E", oscuro: "#46512A" },
  tinta: "#2B1D14",
}
fontFamily: { serif: ['"Playfair Display"', "Georgia", "serif"], sans: ['"Inter"', "system-ui", "sans-serif"] }

=== src/index.css (append after the tailwind directives / imports) ===
@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-crema font-sans text-tinta antialiased; }
  section[id] { scroll-margin-top: 4.5rem; }
  :focus-visible { @apply outline-none ring-2 ring-oliva ring-offset-2 ring-offset-crema; }
}
@layer components {
  .btn { @apply inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60; }
  .btn-primario { @apply btn bg-cafe text-crema hover:bg-cafe-oscuro; }
  .btn-secundario { @apply btn border-2 border-cafe text-cafe hover:bg-cafe hover:text-crema; }
  .titulo-seccion { @apply font-serif text-3xl font-bold text-cafe-oscuro sm:text-4xl; }
  .etiqueta { @apply text-sm font-semibold uppercase tracking-widest text-oliva; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

=== src/App.tsx (page content) ===
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cafe focus:px-4 focus:py-2 focus:text-crema">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Hero />
        <About />
        <Menu />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

=== src/config/contact.ts ===
/**
 * Configuración del formulario de contacto.
 * Servicio: Web3Forms (https://web3forms.com) — gratuito, HTTPS, sin backend propio.
 * La "access key" de Web3Forms es PÚBLICA por diseño: solo identifica el buzón
 * destinatario (que se fija al crear la clave) y no permite leer mensajes ni
 * cambiar el destino. Por eso puede vivir en el frontend sin riesgo.
 * Para activarlo: crea una clave en https://web3forms.com con el correo
 * autorizado que deba recibir los mensajes y pégala aquí.
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "PENDIENTE_CONFIGURAR";

export const isContactConfigured = () =>
  /^[0-9a-f-]{36}$/i.test(WEB3FORMS_ACCESS_KEY);

=== src/lib/validarContacto.ts ===
export type Campos = { nombre: string; email: string; mensaje: string };
export type Errores = Partial<Record<keyof Campos, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Valida los campos del formulario de contacto. Devuelve un objeto vacío si todo es correcto. */
export function validarContacto(c: Campos): Errores {
  const e: Errores = {};
  const nombre = c.nombre.trim();
  const email = c.email.trim();
  const mensaje = c.mensaje.trim();
  if (nombre.length < 2) e.nombre = "Escribe tu nombre (mínimo 2 caracteres).";
  else if (nombre.length > 80) e.nombre = "El nombre no puede superar 80 caracteres.";
  if (!email) e.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_RE.test(email) || email.length > 120) e.email = "Escribe un correo electrónico válido.";
  if (mensaje.length < 10) e.mensaje = "El mensaje debe tener al menos 10 caracteres.";
  else if (mensaje.length > 1000) e.mensaje = "El mensaje no puede superar 1000 caracteres.";
  return e;
}

=== src/data/menu.ts ===
/**
 * Carta de Café La Esquina.
 * Precios FICTICIOS de demostración. Edita libremente nombres, descripciones y precios.
 */
export type Producto = { nombre: string; descripcion: string; precio: number };
export type Categoria = { id: string; titulo: string; productos: Producto[] };

export const carta: Categoria[] = [
  {
    id: "cafes",
    titulo: "Cafés",
    productos: [
      { nombre: "Espresso", descripcion: "Corto, intenso y aromático.", precio: 1.4 },
      { nombre: "Café con leche", descripcion: "El de toda la vida, con leche cremosa.", precio: 1.8 },
      { nombre: "Cortado", descripcion: "Espresso con un toque de leche.", precio: 1.6 },
      { nombre: "Capuchino", descripcion: "Espuma de leche y un poco de cacao.", precio: 2.3 },
      { nombre: "Flat white", descripcion: "Doble espresso con leche sedosa.", precio: 2.6 },
      { nombre: "Café con bebida vegetal", descripcion: "Avena, soja o almendra.", precio: 2.1 },
    ],
  },
  {
    id: "desayunos",
    titulo: "Desayunos",
    productos: [
      { nombre: "Tostada con tomate y aceite", descripcion: "Pan de masa madre, tomate rallado y AOVE.", precio: 2.5 },
      { nombre: "Tostada de aguacate", descripcion: "Aguacate, semillas y un toque de lima.", precio: 4.2 },
      { nombre: "Cruasán a la plancha", descripcion: "Con mantequilla y mermelada.", precio: 2.4 },
      { nombre: "Bocadillo de tortilla", descripcion: "Tortilla de patata del día en pan crujiente.", precio: 3.8 },
      { nombre: "Desayuno La Esquina", descripcion: "Café, zumo de naranja natural y tostada a elegir.", precio: 5.5 },
    ],
  },
  {
    id: "dulces",
    titulo: "Dulces y meriendas",
    productos: [
      { nombre: "Bizcocho casero", descripcion: "Porción del bizcocho del día.", precio: 2.2 },
      { nombre: "Tarta de queso", descripcion: "Cremosa, al horno.", precio: 3.9 },
      { nombre: "Napolitana de chocolate", descripcion: "Hojaldre recién horneado.", precio: 1.9 },
      { nombre: "Cookie de chocolate", descripcion: "Grande, crujiente por fuera y tierna por dentro.", precio: 2.0 },
      { nombre: "Chocolate con churros", descripcion: "Taza de chocolate y ración de churros.", precio: 4.5 },
    ],
  },
];

export const formatoPrecio = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);

=== src/components/Header.tsx ===
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

=== src/components/Hero.tsx ===
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

=== src/components/About.tsx ===
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

=== src/components/Menu.tsx ===
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

=== src/components/Footer.tsx ===
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

=== src/components/Contact.tsx ===
import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, isContactConfigured } from "@/config/contact";
import { validarContacto as validar, type Campos, type Errores } from "@/lib/validarContacto";

type Estado = "inicial" | "enviando" | "exito" | "error";

const vacio: Campos = { nombre: "", email: "", mensaje: "" };

export default function Contact() {
  const [campos, setCampos] = useState<Campos>(vacio);
  const [errores, setErrores] = useState<Errores>({});
  const [estado, setEstado] = useState<Estado>("inicial");
  const [aviso, setAviso] = useState("");
  const enviandoRef = useRef(false); // bloqueo síncrono frente a dobles clics
  const formRef = useRef<HTMLFormElement>(null);

  const cambiar = (k: keyof Campos, v: string) => {
    setCampos((c) => ({ ...c, [k]: v }));
    if (errores[k]) setErrores((e) => ({ ...e, [k]: undefined }));
    if (estado === "exito" || estado === "error") setEstado("inicial");
  };

  const enviar = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (enviandoRef.current) return;

    const errs = validar(campos);
    setErrores(errs);
    const primero = (Object.keys(errs) as (keyof Campos)[])[0];
    if (primero) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus();
      return;
    }

    if (!isContactConfigured()) {
      setEstado("error");
      setAviso("El formulario aún no está configurado (falta la clave del servicio de envío). Inténtalo más tarde.");
      return;
    }

    // Honeypot anti-spam: si un bot rellena este campo oculto, Web3Forms descarta el envío.
    const botcheck = (formRef.current?.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked ?? false;

    enviandoRef.current = true;
    setEstado("enviando");
    setAviso("");
    try {
      // FormData (multipart) = petición CORS "simple": el navegador no lanza preflight OPTIONS,
      // que Web3Forms rechaza. No añadir Content-Type manualmente.
      const datos = new FormData();
      datos.append("access_key", WEB3FORMS_ACCESS_KEY);
      datos.append("subject", "Nuevo mensaje desde la web de Café La Esquina");
      datos.append("from_name", "Web Café La Esquina");
      datos.append("name", campos.nombre.trim());
      datos.append("email", campos.email.trim());
      datos.append("message", campos.mensaje.trim());
      if (botcheck) datos.append("botcheck", "true");
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: datos,
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setEstado("exito");
      setAviso("¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.");
      setCampos(vacio);
    } catch {
      setEstado("error");
      setAviso("No se ha podido enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      enviandoRef.current = false;
    }
  };

  const enviando = estado === "enviando";
  const claseCampo = (k: keyof Campos) =>
    `mt-1 block w-full rounded-xl border bg-white px-4 py-3 text-base text-tinta placeholder:text-tinta/50 ${
      errores[k] ? "border-red-700" : "border-cafe/25"
    }`;

  return (
    <section id="contacto" aria-labelledby="titulo-contacto" className="bg-oliva-oscuro py-16 text-crema md:py-24">
      <div className="container grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-crema/80">Contacto</p>
          <h2 id="titulo-contacto" className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
            ¿Hablamos?
          </h2>
          <p className="mt-4 max-w-prose text-lg text-crema/90">
            Encargos de tartas, desayunos para tu equipo o cualquier sugerencia: escríbenos y te
            contestamos lo antes posible.
          </p>
          <p className="mt-4 text-sm text-crema/75">
            Solo usaremos tus datos para responder a tu mensaje.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={enviar}
          noValidate
          aria-describedby="estado-formulario"
          className="rounded-3xl bg-crema p-6 text-tinta shadow-xl sm:p-8"
        >
          <div>
            <label htmlFor="nombre" className="font-semibold">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              maxLength={80}
              required
              value={campos.nombre}
              onChange={(e) => cambiar("nombre", e.target.value)}
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? "error-nombre" : undefined}
              className={claseCampo("nombre")}
            />
            {errores.nombre && (
              <p id="error-nombre" className="mt-1 text-sm text-red-800">
                {errores.nombre}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="email" className="font-semibold">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={120}
              required
              value={campos.email}
              onChange={(e) => cambiar("email", e.target.value)}
              aria-invalid={!!errores.email}
              aria-describedby={errores.email ? "error-email" : undefined}
              className={claseCampo("email")}
            />
            {errores.email && (
              <p id="error-email" className="mt-1 text-sm text-red-800">
                {errores.email}
              </p>
            )}
          </div>

          <div className="mt-5">
            <label htmlFor="mensaje" className="font-semibold">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              maxLength={1000}
              required
              value={campos.mensaje}
              onChange={(e) => cambiar("mensaje", e.target.value)}
              aria-invalid={!!errores.mensaje}
              aria-describedby={errores.mensaje ? "error-mensaje" : "ayuda-mensaje"}
              className={claseCampo("mensaje")}
            />
            {errores.mensaje ? (
              <p id="error-mensaje" className="mt-1 text-sm text-red-800">
                {errores.mensaje}
              </p>
            ) : (
              <p id="ayuda-mensaje" className="mt-1 text-sm text-tinta/70">
                {campos.mensaje.length}/1000 caracteres
              </p>
            )}
          </div>

          {/* Honeypot: oculto para personas y lectores de pantalla */}
          <input type="checkbox" name="botcheck" tabIndex={-1} aria-hidden="true" className="hidden" />

          <button type="submit" disabled={enviando} aria-busy={enviando} className="btn-primario mt-6 w-full">
            {enviando ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Enviando…
              </>
            ) : (
              "Enviar mensaje"
            )}
          </button>

          <div id="estado-formulario" role="status" aria-live="polite" className="mt-4 min-h-[1.5rem]">
            {estado === "exito" && (
              <p className="flex items-start gap-2 rounded-xl bg-oliva/15 p-3 text-oliva-oscuro">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> {aviso}
              </p>
            )}
            {estado === "error" && (
              <p className="flex items-start gap-2 rounded-xl bg-red-100 p-3 text-red-900">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> {aviso}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

When finished, reply with a short list of the files you created/changed and where the App content is rendered.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://esquina-de-cafe-y-calma.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c695bec5-9554-4243-9762-b717f9c17d86).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
