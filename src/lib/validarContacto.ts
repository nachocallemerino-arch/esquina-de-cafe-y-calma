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
