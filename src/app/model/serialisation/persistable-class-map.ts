import { AbstractType } from "@angular/core";
import { Persistable } from "./persistable";

export namespace PersistableClassMap {
  
  // Place any classes that can implement Persistable in this list so they can be found for later deserialisation
  const persistableClasses: Array<AbstractType<Persistable<any>>> = [
  ];
  
  export const classMap: {[key: string]: any} = persistableClasses.reduce((dict: {[key: string]: any}, clazz) => {
    dict[clazz.name] = clazz;
    return dict;
  }, {});
  
}