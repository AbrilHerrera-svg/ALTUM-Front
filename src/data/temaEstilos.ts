// ============================================================
// temaEstilos.ts — ESTILO VISUAL de cada tema (emoji, planeta, color).
// Esto es puramente cosmético — el título, la cantidad de niveles y
// el contenido de las preguntas SÍ viven en MySQL (CatalogoManager).
// Este mapa solo decide "de qué color se pinta la tarjeta".
// ============================================================

export interface TemaEstilo {
  emoji:    string;
  planet:   string;
  color:    string;
  gradient: string;
  shadow:   string;
}

export const TEMA_ESTILOS: Record<string, TemaEstilo> = {
  basic_arithmetic:    { emoji: '➕', planet: '🌟', color: '#f97316', gradient: 'linear-gradient(135deg, #f97316, #ea580c)', shadow: 'rgba(249,115,22,0.4)' },
  multiplication:      { emoji: '✖️', planet: '🌙', color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', shadow: 'rgba(59,130,246,0.4)' },
  division_basic:      { emoji: '➗', planet: '🔴', color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', shadow: 'rgba(239,68,68,0.4)' },
  fractions_intro:     { emoji: '🍰', planet: '💛', color: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', shadow: 'rgba(234,179,8,0.4)' },
  measurement_basic:   { emoji: '📏', planet: '💚', color: '#22c55e', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', shadow: 'rgba(34,197,94,0.4)' },
  geometry_intro:      { emoji: '⬜', planet: '🟣', color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)', shadow: 'rgba(168,85,247,0.4)' },

  fractions_advanced:  { emoji: '🥧', planet: '🌟', color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)', shadow: 'rgba(236,72,153,0.4)' },
  decimals:            { emoji: '🔵', planet: '🌙', color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', shadow: 'rgba(6,182,212,0.4)' },
  percentages:         { emoji: '💯', planet: '🔴', color: '#f43f5e', gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)', shadow: 'rgba(244,63,94,0.4)' },
  algebra_intro:       { emoji: '📐', planet: '💛', color: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)', shadow: 'rgba(234,179,8,0.4)' },
  area_perimeter:      { emoji: '📊', planet: '💚', color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #059669)', shadow: 'rgba(16,185,129,0.4)' },
  data_graphs:         { emoji: '📈', planet: '🟣', color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', shadow: 'rgba(139,92,246,0.4)' },

  proportionality:     { emoji: '⚖️', planet: '🪐', color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #4338ca)', shadow: 'rgba(124,58,237,0.4)' },
  statistics:          { emoji: '📊', planet: '🌍', color: '#0891b2', gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', shadow: 'rgba(8,145,178,0.4)' },
  numeric:             { emoji: '🔢', planet: '🌑', color: '#db2777', gradient: 'linear-gradient(135deg, #db2777, #9d174d)', shadow: 'rgba(219,39,119,0.4)' },
  measurement:         { emoji: '📏', planet: '🟢', color: '#059669', gradient: 'linear-gradient(135deg, #059669, #0d9488)', shadow: 'rgba(5,150,105,0.4)' },
  logic:               { emoji: '🧩', planet: '🌟', color: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #b45309)', shadow: 'rgba(217,119,6,0.4)' },
  finance:             { emoji: '💰', planet: '🌕', color: '#16a34a', gradient: 'linear-gradient(135deg, #16a34a, #15803d)', shadow: 'rgba(22,163,74,0.4)' },
};

export const ESTILO_DEFAULT: TemaEstilo = {
  emoji: '🌟', planet: '🪐', color: '#7c3aed',
  gradient: 'linear-gradient(135deg, #7c3aed, #4338ca)', shadow: 'rgba(124,58,237,0.4)',
};

export function obtenerEstiloDeTema(slug: string): TemaEstilo {
  return TEMA_ESTILOS[slug] || ESTILO_DEFAULT;
}