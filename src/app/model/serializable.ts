import { Identifier } from "./identifier/identifier";

export abstract class Serializable {
  
  ident: Identifier;
  
  constructor(ident: Identifier) {
    this.ident = ident;
  }

}