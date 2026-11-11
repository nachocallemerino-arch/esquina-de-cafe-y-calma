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
