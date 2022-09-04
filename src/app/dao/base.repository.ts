import {Lookup} from "../model/lookup";

export abstract class BaseRepository<T extends Serializable> {
  
  abstract get REPOSITORY_KEY(): string;
  
  getKeys(): Array<string> {
    return Object.keys(this.retrieveAll());
  }
  
  getLookups(): Array<Lookup> {
    const lookups: Array<Lookup> = [];
    const list = this.retrieveAll();
    for (const key in list) {
      const obj = list[key];
      lookups.push(new Lookup(obj.code, obj.name));
    }
    lookups.sort((a,b) => a.name.localeCompare(b.name));
    return lookups;
  }
  
  save(obj: T) {
    const list = this.retrieveAll();
    list[obj.code] = obj;
    localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(list));
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
    return value ? JSON.parse(value) : {};
  }
  
}

export interface Serializable {
  
  get code(): string;
  get name(): string;
  
}