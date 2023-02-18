import { Enum } from "../enum/enum";

export interface Persistable<T extends Persistable<T>> {
  
  // must call the class constructor
  clone(): T;
  
}

export type PersistableType = 'undefined' | 'number' | 'bigint' | 'string' | 'boolean' | Enum | Array<PersistableType> | Persistable<any>;