export class ErrorService {
  
  static err(msg: string) {
    console.error(msg);
    throw new Error(msg);
  }
  
}