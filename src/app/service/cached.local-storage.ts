import { LocalStorable, LocalStorage } from "./local-storage";

export abstract class CachedLocalStorage<T extends LocalStorable> extends LocalStorage<T> {
  
  private cache: {[key: string]: T} = {};
  
  override create(data: T): T {
    const createdData = super.create(data);
    this.cache[data.key] = data;
    return data;
  }
  
  override load(key: string): T {
    // Try to get cached version
    let data: T = this.cache[key];
    if (data) return data;
    
    // Load the old-fashioned way and save in cache
    data = super.load(key);
    this.cache[key] = data;
    return data;
  }
  
  override delete(key: string): void {
    super.delete(key);
    delete this.cache[key];
  }
  
}