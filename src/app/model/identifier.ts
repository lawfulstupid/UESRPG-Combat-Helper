export class Identifier {
  
  readonly key: string;   // identifer for persistance
  readonly name: string;  // display name
  
  constructor(key: string, name: string) {
    this.key = key;
    this.name = name;
  }
  
}