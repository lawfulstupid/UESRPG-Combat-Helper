import {
  ID,
  Serializable
} from '../model/serializable';

export abstract class BaseRepository<T extends Serializable<T>> {
  
  abstract get REPOSITORY_KEY(): string;
  abstract makeNew(id: ID): T;
  
  save(obj: T) {
    const collection = this.retrieveAll();
    collection[obj.id] = obj;
    localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(collection));
  }
  
  retrieve(key: string): T {
    return this.retrieveAll()[key];
  }
  
  delete(key: string) {
    const list = this.retrieveAll();
    delete list[key];
    localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(list));
  }
  
  retrieveAll(): {[key: string]: T} {
    const value: string | null = localStorage.getItem(this.REPOSITORY_KEY);
    const collection: {[key: string]: T} = value ? JSON.parse(value) : {};
    for (const key in collection) {
      const newObj: T = this.makeNew(key);
      newObj.pullDataFrom(collection[key]);
      collection[key] = newObj;
    }
    return collection;
  }
  
}