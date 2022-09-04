export abstract class Serializable<T extends Serializable<T>> {

  id: ID;

  constructor(id: ID) {
    this.id = id;
    Reflect.defineProperty(this, 'pullDataFrom', {
      value: this.pullDataFrom,
      configurable: false,
      writable: false,
      enumerable: false
    });
  }

  pullDataFrom(obj: T) {
    for (const field in obj) {
      if (field in this) {
        if ((<any>this)[field] instanceof Serializable) {
          (<any>this)[field].pullDataFrom(obj[field]);
        } else {
          (<any>this)[field] = obj[field];
        }
      }
    }
  }

}

export type ID = string;