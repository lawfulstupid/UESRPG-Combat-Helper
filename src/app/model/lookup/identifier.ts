export class Identifier {
  
  key: string;    // identifer for persistance
  name?: string;  // display name
  
  constructor(key: string, name?: string) {
    this.key = key;
    this.name = name;
  }
  
}