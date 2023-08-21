import { AbstractType } from "@angular/core";
import { PersistableByProxy } from "src/app/persistence/persistable";

export abstract class Enum<T extends Enum<T>> implements PersistableByProxy<T,string> {
  
  /* PURE REFLECTIVE JANK // IT JUST WORKS */
  
  key(): string {
    return Enum.key<typeof this>(this, this.class());
  }
  
  class(): AbstractType<this> {
    return Object.getPrototypeOf(this).constructor;
  }
  
  static keys(clazz: any = this): Array<string> {
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
  
  protected constructor(
    readonly name: string,
    readonly code?: string
  ) {}
  
  proxy(): string {
    return this.key();
  }
  
  deproxy(key: string): T {
    return Enum.value(key, this); // this refers to the current class; see source interface
  }
  
}