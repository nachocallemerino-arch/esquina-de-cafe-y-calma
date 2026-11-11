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
      // Personalización del correo (plan gratuito de Web3Forms): asunto, remitente,
      // responder-a y etiquetas de campo en español. El texto de introducción es Pro.
      const nombre = campos.nombre.trim();
      const email = campos.email.trim();
      const fecha = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Madrid",
      }).format(new Date());
      const datos = new FormData();
      datos.append("access_key", WEB3FORMS_ACCESS_KEY);
      datos.append("subject", `☕ Café La Esquina · Nuevo mensaje de ${nombre}`);
      datos.append("from_name", "Café La Esquina");
      datos.append("replyto", email); // «Responder» en el correo contesta directamente al cliente
      datos.append("Nombre", nombre);
      datos.append("Correo", email); // nombres de campo sin tildes: Web3Forms los corrompe
      datos.append("Mensaje", campos.mensaje.trim());
      datos.append("Recibido", fecha);
      datos.append("Origen", "Formulario de contacto de la web de Café La Esquina");
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
