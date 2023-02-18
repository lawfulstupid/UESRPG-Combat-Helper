import { AbstractType } from "@angular/core";
import { PersistableClassMap } from "../../persistence/persistable";
import { PersistableByProxy } from "../../persistence/persistable-proxy";

export abstract class Enum<T extends Enum<T>> implements PersistableByProxy<T,string> {
  
  /* PURE REFLECTIVE JANK // IT JUST WORKS */
  
  key(): string {
    return Enum.key(this, Object.getPrototypeOf(this).constructor);
  }
  
  class(): AbstractType<any> {
    return Object.getPrototypeOf(this).constructor;
  }
  
  static keys<T>(clazz: any = this): Array<string> {
    return Object.keys(clazz);
  }
  
  static key<T>(enumValue: T, clazz: any = this): string {
    return <string> this.keys(clazz).find(enumKey => clazz[enumKey] === enumValue);
  }
  
  static values<T>(clazz: any = this): Array<T> {
    return this.keys(clazz).map(enumKey => clazz[enumKey]);
  }
  
  static value<T>(key: string, clazz: any = this): T {
    return clazz[key];
  }
  
  protected constructor(readonly name: string) {
    const clazz = this.class();
    PersistableClassMap[clazz.name] = clazz;
  }
  
  proxy(): string {
    return this.key();
  }
  
  deproxy(key: string): T {
    return Enum.value(key, this); // this refers to the current class; see source interface
  }
  
}