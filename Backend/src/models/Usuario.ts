// ============================================================
// Usuario.ts — MODELO DE USUARIO
// Define la "plantilla" de cómo es un usuario en la app.
// Una clase es un molde: con él puedes crear muchos objetos iguales.
// Ejemplo: new Usuario('Abril', '5° Primaria', 'abril@mail.com', '👩‍🚀', 1)
// ============================================================

export class Usuario {

  // Atributos PRIVADOS: solo se pueden leer/cambiar desde dentro de esta clase.
  // Esto protege los datos — nadie puede hacer usuario.nombre = 'hack' desde afuera.
  private id?:        number; // el ? significa que es OPCIONAL (puede no tener id todavía)
  private nombre:     string;
  private grado:      string;
  private correo:     string;
  private avatar:     string; // emoji como 👨‍🚀
  private role:       'student' | 'teacher' | 'admin';
  private contraseña: string; // NUNCA se expone en toJSON()

  // Constructor: se ejecuta automáticamente al hacer new Usuario(...)
  // Recibe los datos y los guarda en los atributos de la clase
  constructor(nombre: string, grado: string, correo: string, avatar: string, id?: number, role: 'student' | 'teacher' | 'admin' = 'student', contraseña: string = '') {
    this.id         = id;
    this.nombre     = nombre;
    this.correo     = correo;
    this.grado      = grado;
    this.avatar     = avatar;
    this.role       = role;
    this.contraseña = contraseña;
  }

  // GETTERS: métodos públicos para leer los atributos privados.
  // Son como "ventanillas" de solo lectura.
  public getId():         number | undefined { return this.id;         }
  public getNombre():     string             { return this.nombre;     }
  public getGrado():      string             { return this.grado;      }
  public getCorreo():     string             { return this.correo;     }
  public getAvatar():     string             { return this.avatar;     }
  public getRole():       string             { return this.role;       }
  public getContraseña(): string             { return this.contraseña; }

  // toJSON(): convierte el objeto a un objeto plano (sin métodos).
  // Express necesita esto para poder enviarlo como respuesta HTTP en formato JSON.
  // Sin esto, res.json(usuario) no funcionaría correctamente.
  // La contraseña NUNCA se incluye aquí — así nunca viaja al frontend.
  public toJSON() {
    return {
      id:     this.id,
      nombre: this.nombre,
      grado:  this.grado,
      correo: this.correo,
      avatar: this.avatar,
      role:   this.role,
    };
  }
}
