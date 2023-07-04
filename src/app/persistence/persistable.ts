import { AbstractType } from "@angular/core";
import { PersistableClassMap } from "./class-mapping";
import { PersistableType, PersistenceProxy } from "./types";

interface GeneralPersistable {
}

export interface Persistable<T extends Persistable<T>> extends GeneralPersistable {
  clone(): T; // must call the class constructor
}

export interface PersistableByProxy<T extends PersistableByProxy<T,P>, P extends PersistableType> extends GeneralPersistable {
  proxy(): P;
  deproxy(proxy: P): T; // always run in a static context, meaning `this` will refer to the class
}

// Decorate classes with @RegisterPersistable to add them to PersistableClassMap
export function RegisterPersistable<T extends GeneralPersistable>(ident: string) {
  return (target: AbstractType<T>) => {
    PersistableClassMap.put(ident, target);
  };
}

// Decorate fields with @PersistUsing to override default persistence logic
export function PersistUsing<T, P extends PersistableType>(proxy: PersistenceProxy<T,P>) {
  return (containingClass: any, fieldName: string) => {
    console.log('PersistAs Field', containingClass, fieldName);
  };
}