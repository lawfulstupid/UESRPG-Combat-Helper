export class Identifier {
  
  get key(): string {
    return this._key;
  }
  
  get name(): string {
    return this._name;
  }
  
  get code(): string | undefined {
    return this._code;
  }
  
  constructor(
    private _key: string,
    private _name: string,
    private _code?: string
  ) {}
  
  renamed(alias: string): this {
    const clone: typeof this = Object.create(this);
    clone._name = alias;
    return clone;
  }
  
}