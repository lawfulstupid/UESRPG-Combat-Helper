export abstract class BaseRepository<T extends Serializable> {
  
  abstract get REPOSITORY_KEY(): string;
  
  private getFullKey(key: string): string {
    return this.REPOSITORY_KEY + '.' + key;
  }
  
  save(obj: T) {
    localStorage.setItem(this.REPOSITORY_KEY + '.' + obj.code, JSON.stringify(obj));
  }
  
  retrieve(key: string): T {
    const value: string | null = localStorage.getItem(this.getFullKey(key));
    return <T> (value && JSON.parse(value));
  }
  
  delete(key: string) {
    localStorage.removeItem(this.getFullKey(key));
  }
  
  getKeys(): Array<string> {
    const value: string | null = localStorage.getItem(this.REPOSITORY_KEY);
    if (!value) {
      return [];
    } else {
      const obj: any = JSON.parse(value);
      return Object.keys(obj);
    }
  }
  
}

export interface Serializable {
  
  get code(): string;
  
}