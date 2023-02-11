export class Identifier {
  
  readonly key: string;   // identifer for persistance
  readonly _name: string; // display name
  private alias?: string; // alternative display name
  
  get name(): string {
    return this.alias || this._name;
  }
  
  get trueName(): string {
    return this._name;
  }
  
  constructor(key: string, name: string) {
    this.key = key;
    this._name = name;
  }
  
  renamed(alias: string): typeof this {
    const clone: typeof this = Object.create(this);
    clone.alias = alias;
    return clone;
  }
  
}