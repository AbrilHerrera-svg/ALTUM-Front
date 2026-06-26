export class Usuario {
  // Atributos privados para cumplir con el Encapsulamiento (POO)
  private id?: number;
  private nombre: string;
  private grado: string;
  private correo: string;
  private avatar: string;

  // Constructor para inicializar el objeto
  constructor(nombre: string, grado: string, correo: string, avatar: string, id?: number) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.grado = grado;
    this.avatar = avatar;
  }

  // Métodos Getters públicos para acceder a los datos encapsulados
  public getId(): number | undefined { return this.id; }
  public getNombre(): string { return this.nombre; }
  public getGrado(): string { return this.grado; }
  public getCorreo(): string { return this.correo; }
  public getAvatar(): string { return this.avatar; }

  // Método para transformar la instancia de clase a formato JSON estándar para el Frontend
  public toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      grado: this.grado,
      correo: this.correo,
      avatar: this.avatar,
    };
  }
}