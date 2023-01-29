export class ErrorService {
  
  static err(msg: string): Error {
    console.error(msg);
    return new Error(msg);
  }
  
}