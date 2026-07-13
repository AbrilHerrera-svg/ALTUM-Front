// ============================================================
// shuffle-answers.js — REORGANIZA LAS RESPUESTAS ALEATORIAMENTE
// Asegura que las respuestas correctas estén distribuidas en
// todas las posiciones (A, B, C, D) de forma aleatoria
// ============================================================

const fs = require('fs');

const archivo = './src/controllers/EjercicioController.ts';
let contenido = fs.readFileSync(archivo, 'utf-8');

// Expresión regular para encontrar cada Ejercicio
const regex = /new Ejercicio\('([^']*)'\s*,\s*\[([^\]]*)\]\s*,\s*'([^']*)'/g;

let contados = 0;

contenido = contenido.replace(regex, (match, pregunta, opcionesStr, respuesta) => {
  // Parsear las opciones
  const opciones = opcionesStr
    .split(',')
    .map(o => o.trim().slice(1, -1)) // Quitar comillas
    .filter(o => o.length > 0);

  // Si la respuesta no está en las opciones, no hacer nada
  if (!opciones.includes(respuesta)) {
    return match;
  }

  // Mezclar (shuffle) las opciones
  let opcionesBarajadas = [...opciones];
  for (let i = opcionesBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opcionesBarajadas[i], opcionesBarajadas[j]] = [opcionesBarajadas[j], opcionesBarajadas[i]];
  }

  // Reconstruir con las opciones barajadas
  const opcionesFormato = opcionesBarajadas.map(o => `'${o}'`).join(', ');
  const resultado = `new Ejercicio('${pregunta}', [${opcionesFormato}], '${respuesta}'`;

  contados++;
  return resultado;
});

// Guardar el archivo modificado
fs.writeFileSync(archivo, contenido, 'utf-8');

console.log(`${contados} ejercicios procesados`);
console.log('Las respuestas correctas ahora están distribuidas aleatoriamente');
console.log(' Reconstruye el backend: npm run build');
