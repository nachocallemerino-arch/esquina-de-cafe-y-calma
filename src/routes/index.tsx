import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

const TITULO = "Café La Esquina · Tu rincón favorito del barrio";
const DESCRIPCION =
  "Café La Esquina: cafetería de barrio con café de calidad, desayunos y dulces recién preparados en un ambiente acogedor. Proyecto de demostración.";
const OG_DESCRIPCION = "Café de calidad, desayunos y dulces recién preparados en un ambiente acogedor.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: OG_DESCRIPCION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
