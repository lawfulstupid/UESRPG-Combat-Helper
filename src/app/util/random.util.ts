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
  
}