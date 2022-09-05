import {Serializable} from '../model/serializable';
import {SerialCollection} from '../model/serial-collection';

export abstract class BaseRepository<T extends Serializable> {
  
  abstract get REPOSITORY_KEY(): string;
  abstract makeNew(): T;
  
  save(key: string, obj: T) {
    const collection = this.retrieveAll();
    collection.put(key, obj);
    localStorage.setItem(this.REPOSITORY_KEY, collection.serialize());
  }
  
  retrieve(key: string): T {
    return this.retrieveAll().get(key);
  }
  
  delete(key: string) {
    const collection = this.retrieveAll();
    collection.delete(key);
    localStorage.setItem(this.REPOSITORY_KEY, collection.serialize());
  }
  
  retrieveAll(): SerialCollection<T> {
    const value: string | null = localStorage.getItem(this.REPOSITORY_KEY);
    if (value) {
      return SerialCollection.deserialize(value, this.makeNew);
    } else {
      return new SerialCollection<T>();
    }
  }
  
}