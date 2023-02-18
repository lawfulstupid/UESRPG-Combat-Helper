import { AbstractType } from "@angular/core";
import { Enum } from "../enum/enum";

export interface Persistable<T extends Persistable<T>> {
  
  // must call the class constructor
  clone(): T;
  
}

export type PersistableType = 'undefined' | 'number' | 'bigint' | 'string' | 'boolean' | Enum | Array<PersistableType> | Persistable<any>;

export const PersistableClassMap: {[key: string]: AbstractType<Persistable<any>>} = {};

// Decorate classes with @persistable to add them to PersistableClassMap to enable deserialisation
export function persistable<T extends Persistable<T>>(target: AbstractType<T>) {
  PersistableClassMap[target.name] = target;
}