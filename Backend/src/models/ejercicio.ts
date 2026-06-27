export class Ejercicio {
  private question: string;
  private options: string[];
  private correct: string;
  private tip: string;

  constructor(question: string, options: string[], correct: string, tip: string) {
    this.question = question;
    this.options = options;
    this.correct = correct;
    this.tip = tip;
  }

  public getQuestion(): string { return this.question; }
  public getOptions(): string[] { return this.options; }
  public getCorrect(): string { return this.correct; }
  public getTip(): string { return this.tip; }

  public toJSON() {
    return {
      question: this.question,
      options: this.options,
      correct: this.correct,
      tip: this.tip
    };
  }
}