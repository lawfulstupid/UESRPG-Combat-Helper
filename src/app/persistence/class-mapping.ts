import { AbstractType } from "@angular/core";
import { PersistenceProxy } from "./types";

export class PersistableClassMap {
  
  /* Maintains two maps: ClassName -> GUID and GUID -> Class
   * Effectively maps ClassName -> Class but GUID is inserted in the middle as
   * a static reference point unaffected by refactoring (class renaming).
   */
  
  private static classMap: {[ident: string]: [AbstractType<any>, {[fieldName: string]: PersistenceProxy<any,any>}]} = {};
  private static identMap: {[className: string]: string} = {};
  
  static put(ident: string, clazz: AbstractType<any>) {
    const existingClass = this.classMap[ident][0];
    if (existingClass !== undefined && existingClass.name !== clazz.name) {
      throw new Error('Duplicate guid \'' + ident + '\' used by ' + existingClass.name + ' and ' + clazz.name);
    }
    this.classMap[ident] = [clazz, {}];
    this.identMap[clazz.name] = ident;
  }
  
  static getClass(ident: string): AbstractType<any> {
    const clazz = this.classMap[ident][0];
    if (clazz === undefined) throw new Error('Class with guid \'' + ident + '\' not found');
    return clazz;
  }
    
  static getIdent(clazz: AbstractType<any>): string {
    const ident = this.identMap[clazz.name];
    if (ident === undefined) throw new Error('Class \'' + clazz.name + '\' has not been registered');
    return ident;
  }
    
  static getIdentOfObject(obj: any): string {
    return this.getIdent(Object.getPrototypeOf(obj).constructor);
  }
  
  static putProxy(ident: string, fieldName: string, proxy: PersistenceProxy<any,any>) {
    
  }
  
}