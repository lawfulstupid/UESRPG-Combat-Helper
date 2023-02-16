export class RandomUtil {
  
  static d(n: number): number {
    return Math.ceil(Math.random() * n);
  }
  
  static d4 = () => this.d(4);
  static d6 = () => this.d(6);
  static d8 = () => this.d(8);
  static d10 = () => this.d(10);
  static d12 = () => this.d(12);
  static d20 = () => this.d(20);
  static d100 = () => this.d(100);
  
  static coinFlip(): boolean {
    return this.d(2) === 1;
  }
  
  // Evaluate a dice expression e.g. "2d6+1"
  static eval(expr: string): number {
    return expr.replace(/\s+/g, '').split('+').map(this.evalTerm).reduce((s,x) => s + x);
  }
  
  // Argument takes the form "<number>|<number>d<number>"
  private static evalTerm(term: string): number {
    const splits = term.split('d').map(Number.parseInt);
    if (splits.length === 1) {
      return splits[0];
    } else if (splits.length === 2) {
      let sum = 0;
      for (let i = 0; i < splits[0]; i++) {
        sum += RandomUtil.d(splits[1]);
      }
      return sum;
    } else {
      throw new Error('Could not parse term "' + term + '"');
    }
  }
  
  static fromList<T>(list: Array<T>): T {
    return list[this.d(list.length) - 1];
  }
  
}