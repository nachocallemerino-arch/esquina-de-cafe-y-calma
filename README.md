# Café La Esquina · Landing de cafetería de barrio

Landing de una sola página para una cafetería de barrio **ficticia**. Es un encargo de práctica de Kodarvia.

- **Web publicada:** https://esquina-de-cafe-y-calma.lovable.app
- **Proyecto en Lovable:** https://lovable.dev/projects/c695bec5-9554-4243-9762-b717f9c17d86 (este repositorio se sincroniza con él)

## Contenido
- **Cabecera** fija con navegación, botón «Contáctanos» y menú móvil.
- **Presentación:** «Tu rincón favorito del barrio» y botón «Descubre nuestra carta».
- **Nuestra cafetería:** café de calidad, productos recién preparados y ambiente acogedor.
- **Carta:** Cafés, Desayunos y Dulces y meriendas, con precios ficticios.
- **Contacto:** formulario con validación, estados de carga, éxito y error, protección frente a doble envío y honeypot. El **envío es real** a través de Web3Forms.
- **Pie:** datos marcados como ficticios y aviso de proyecto de demostración.

## Tecnología
React · TypeScript · TanStack Start · Tailwind CSS v4 · lucide-react, sobre la plantilla por defecto de Lovable.

## Dónde editar
| Qué | Archivo |
|---|---|
| Carta y precios | `src/data/menu.ts` |
| Clave del formulario (Web3Forms) | `src/config/contact.ts` |
| Formulario y formato del correo | `src/components/Contact.tsx` |
| Secciones | `src/components/*.tsx` |
| Colores y tipografías | `src/styles.css` (`@theme`) |
| Título, descripción e idioma | `src/routes/__root.tsx` |

## Formulario de contacto
Envía con [Web3Forms](https://web3forms.com) mediante HTTPS, sin backend propio. La *access key* de `src/config/contact.ts` es **pública por diseño**: solo dirige los mensajes al buzón asociado y no permite leerlos ni cambiar el destino. El repositorio no contiene ningún otro secreto.

## Desarrollo local
```sh
git clone https://github.com/nachocallemerino-arch/esquina-de-cafe-y-calma.git
cd esquina-de-cafe-y-calma
npm i
npm run dev
```

## Créditos
Fotografías de Unsplash (Licencia Unsplash). Hecho con [Lovable](https://lovable.dev).
