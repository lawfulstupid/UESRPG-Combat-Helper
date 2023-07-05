import { ErrorComponent } from "../components/error/error.component";
import { Identifier } from "../model/identifier";

export abstract class LocalStorage<T extends LocalStorable> {
  
  readonly abstract MASTER_KEY: string;
  
  protected abstract construct(obj: any): T;
  
  private fullKey(entityKey: string): string {
    return this.MASTER_KEY + ':' + entityKey;
  }
  
  private entityKey(fullKey: string): string {
    return fullKey.substring(this.MASTER_KEY.length + 1);
  }
  
  create(data: T): T {
    if (this.exists(data.key)) {
      throw ErrorComponent.error(this.MASTER_KEY + ' with key \'' + data.key + '\' already exists');
    }
    return this.save(data);
  }
  
  update(data: T): T {
    if (!this.exists(data.key)) {
      throw ErrorComponent.error(this.MASTER_KEY + ' with key \'' + data.key + '\' does not exist in database');
    }
    
    return this.save(data);
  }
  
  private save(data: T): T {
    localStorage.setItem(this.fullKey(data.key), JSON.stringify(data));
    return data;
  }
  
  load(key: string): T {
    const str = localStorage.getItem(this.fullKey(key));
    if (!str) throw new Error('No ' + this.MASTER_KEY + ' found with key \'' + key + '\'');
    const obj = JSON.parse(str);
    return this.construct(obj);
  }
  
  delete(key: string) {
    localStorage.removeItem(this.fullKey(key));
  }
  
  exists(key: string): boolean {
    for (let fullKey of Object.keys(localStorage)) {
      if (fullKey === this.fullKey(key)) return true;
    }
    return false;
  }
  
  list(): Array<Identifier> {
    const list: Array<Identifier> = [];
    for (let fullKey of Object.keys(localStorage)) {
      if (fullKey.startsWith(this.MASTER_KEY + ':')) {
        const key = this.entityKey(fullKey);
        const data: T = this.load(key);
        list.push(new Identifier(key, data.name));
      }
    }
    return list.sort((a,b) => a.name.localeCompare(b.name));
  }
  
}

export interface LocalStorable {
  key: string;
  name: string;
}