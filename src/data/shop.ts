// ============================================================
// shop.ts — CATÁLOGO DE LA TIENDA
// Define los personajes base (gratis) y los accesorios que el
// alumno puede comprar con las estrellas que gana jugando.
// ============================================================

// Un personaje base: la "forma" del avatar antes de ponerle accesorios
export interface Character {
  id:    string; // clave única, ej: 'astro_m'
  emoji: string; // emoji que se muestra como avatar
  label: string; // nombre mostrado en la tarjeta de selección
}

// Un accesorio de la tienda: cuesta estrellas y se puede comprar una sola vez
export interface ShopItem {
  id:    string; // clave única, ej: 'lentes_marciano'
  name:  string; // nombre mostrado en la tienda
  emoji: string; // emoji que representa el accesorio
  price: number; // costo en estrellas
}

// ── PERSONAJES BASE ───────────────────────────────────────────
// Siempre disponibles, no cuestan estrellas. Elegir uno cambia el avatar.
export const CHARACTERS: Character[] = [
  { id: 'astro_m', emoji: '👨‍🚀', label: 'Astronauta (Él)' },
  { id: 'astro_f', emoji: '👩‍🚀', label: 'Astronauta (Ella)' },
  { id: 'alien',   emoji: '👽',   label: 'Alíen' },
];

// ── ACCESORIOS DE LA TIENDA ────────────────────────────────────
// Cada uno tiene un precio distinto en estrellas.
export const SHOP_ITEMS: ShopItem[] = [
  { id: 'camiseta_alien',   name: 'Camiseta de Alíen',   emoji: '👕', price: 15 },
  { id: 'lentes_marciano',  name: 'Lentes de marciano',  emoji: '🕶️', price: 10 },
  { id: 'casco_dorado',     name: 'Casco Dorado',        emoji: '⛑️', price: 25 },
  { id: 'capa_heroe',       name: 'Capa de Héroe',       emoji: '🦸', price: 20 },
  { id: 'banda_ninja',      name: 'Banda Ninja',         emoji: '🥷', price: 12 },
  { id: 'corona_real',      name: 'Corona Real',         emoji: '👑', price: 30 },
  { id: 'guantes_espacio',  name: 'Guantes Espaciales',  emoji: '🧤', price: 8  },
  { id: 'medalla_oro',      name: 'Medalla de Oro',      emoji: '🏅', price: 18 },
];

// ── RANGOS SEGÚN ESTRELLAS TOTALES ────────────────────────────
// Le da un título divertido al alumno según cuántas estrellas acumuló.
export function obtenerRango(stars: number): string {
  if (stars >= 60) return 'Comandante Galáctico';
  if (stars >= 30) return 'Piloto Cósmico';
  if (stars >= 10) return 'Explorador Estelar';
  return 'Cadete Estelar';
}
