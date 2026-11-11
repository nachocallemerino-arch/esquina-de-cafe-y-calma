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
