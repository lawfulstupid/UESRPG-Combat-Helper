export class Identifier {
  
  private alias?: string; // alternative display name (TODO #28: remove)
  
  get key(): string {
    return this._key;
  }
  
  get name(): string {
    return this.alias || this._name;
  }
  
  get trueName(): string {
    return this._name;
  }
  
  constructor(
    private readonly _key: string,
    private readonly _name: string
  ) {}
  
  renamed(alias: string): typeof this {
    const clone: typeof this = Object.create(this);
    clone.alias = alias;
    return clone;
  }
  
}