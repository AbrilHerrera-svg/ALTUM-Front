// ============================================================
// ejercicio.ts — MODELO DE EJERCICIO (PREGUNTA)
// Define la plantilla de una pregunta de opción múltiple.
// Ejemplo: new Ejercicio('¿Cuánto es 2+2?', ['3','4','5','6'], '4', 'Suma los dedos 🖐️')
// ============================================================

export class Ejercicio {

  // Atributos privados — los datos de la pregunta
  private question: string;   // el texto de la pregunta
  private options:  string[]; // array con las 4 opciones de respuesta
  private correct:  string;   // cuál de las opciones es la correcta
  private tip:      string;   // pista que se muestra cuando el alumno pide ayuda

  // Constructor: se llama al hacer new Ejercicio(...)
  constructor(question: string, options: string[], correct: string, tip: string) {
    this.question = question;
    this.options  = options;
    this.correct  = correct;
    this.tip      = tip;
  }

  // GETTERS: acceso de solo lectura a cada atributo
  public getQuestion(): string   { return this.question; }
  public getOptions():  string[] { return this.options;  }
  public getCorrect():  string   { return this.correct;  }
  public getTip():      string   { return this.tip;      }

  // toJSON(): convierte el objeto a formato plano para enviarlo como respuesta HTTP.
  // El frontend recibe este objeto y lo usa para mostrar la pregunta y las opciones.
  public toJSON() {
    return {
      question: this.question,
      options:  this.options,
      correct:  this.correct,
      tip:      this.tip
    };
  }
}
