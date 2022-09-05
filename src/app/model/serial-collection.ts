import {Serializable} from './serializable';

export class SerialCollection<T extends Serializable> extends Serializable {

  private contents: {[key: string]: T} = {};

  override serialize(): string {
    const contentStrings: Array<string> = [];
    for (const key of this.getKeys()) {
      contentStrings.push('"' + key + '":' + this.get(key).serialize());
    }
    const result: string = "{" + contentStrings.join() + "}";
    console.debug(result);
    return result;
  }

  public static deserialize<T extends Serializable>(json: string, makeNew: () => T): SerialCollection<T> {
    const collection: SerialCollection<T> = new SerialCollection<T>();
    const basicValues = JSON.parse(json);
    for (const key in basicValues) {
      const newObj: T = makeNew();
      newObj.pullDataFrom(basicValues[key]);
      collection.put(key, newObj);
    }
    return collection;
  }

  override pullDataFrom(obj: SerialCollection<T>) {
    for (const field in obj.contents) {
      this.contents[field].pullDataFrom(obj.contents[field]);
    }
  }

  public get(key: string): T {
    return this.contents[key];
  }

  public put(key: string, elem: T) {
    this.contents[key] = elem;
  }

  public delete(key: string) {
    delete this.contents[key];
  }

  public getKeys(): Array<string> {
    return Object.keys(this.contents);
  }

}