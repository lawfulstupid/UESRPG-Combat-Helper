export abstract class Serializable<T> {

  public serialize(): string {
    return JSON.stringify(this);
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