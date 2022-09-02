import { Lookup } from "../model/lookup";

export abstract class BaseRepository<T extends Serializable> {
  
  abstract get REPOSITORY_KEY(): string;
  
  getKeys(): Array<string> {
    return Object.keys(this.getAll());
  }
  
  getLookups(): Array<Lookup> {
    const lookups: Array<Lookup> = [];
    const list = this.getAll();
    for (const key in list) {
      const obj = list[key];
      lookups.push(new Lookup(obj.code, obj.name));
    }
    lookups.sort((a,b) => a.name.localeCompare(b.name));
    return lookups;
  }
  
  save(obj: T) {
    const list = this.getAll();
    list[obj.code] = obj;
    localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(list));
  }
  
  retrieve(key: string): T {
    return this.getAll()[key];
  }
  
  delete(key: string) {
    const list = this.getAll();
    delete list[key];
    localStorage.setItem(this.REPOSITORY_KEY, JSON.stringify(list));
  }
  
  private getAll(): {[key: string]: T} {
    const value: string | null = localStorage.getItem(this.REPOSITORY_KEY);
    return value ? JSON.parse(value) : {};
  }
  
}

export interface Serializable {
  
  get code(): string;
  get name(): string;
  
}