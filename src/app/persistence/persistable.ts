import { AbstractType } from "@angular/core";
import { PersistableByProxy } from "./persistable-proxy";

export interface Persistable<T extends Persistable<T>> {
  
  // must call the class constructor
  clone(): T;
  
}

export const PersistableClassMap: {[key: string]: AbstractType<Persistable<any> | PersistableByProxy<any,any>>} = {};

// Decorate classes with @persistable to add them to PersistableClassMap to enable deserialisation
export function persistable<T extends Persistable<any> | PersistableByProxy<any,any>>(target: AbstractType<T>) {
  PersistableClassMap[target.name] = target;
}