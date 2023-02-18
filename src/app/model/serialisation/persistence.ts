import { AbstractType } from "@angular/core";
import { Persistable, PersistableClassMap } from "./persistable";
import { PersistableByProxy } from "./persistable-proxy";
import { ObjectType, PersistableType, RawArray, RawObject, RawProxy, RawType } from "./types";

export abstract class Persistence {
  
  /* TW: FOUL EVIL CURSED CODE */
  
  static serialise(obj: PersistableType): string {
    return JSON.stringify(this.simplify(obj));
  }
  
  static deserialise<T extends PersistableType>(str: string): T {
    return this.desimplify(JSON.parse(str));
  }
  
  static simplify(obj: any): RawType {
    switch (this.getType(obj)) {
      case 'primitive':
        return <RawType>obj;
      case 'array':
        return Persistence.simplifyArray(<Array<PersistableType>>obj);
      case 'object':
        return Persistence.simplifyObject(<Persistable<any>>obj);
      case 'proxy':
        return Persistence.simplifyProxy(<PersistableByProxy<any,any>>obj);
      default:
        throw new Error('Cannot serialise object of type \'' + this.getType(obj) + '\'');
    }
  }
  
  private static simplifyArray<T extends PersistableType>(obj: Array<T>): RawArray {
    return obj.map(item => this.simplify(item));
  }
  
  private static simplifyObject<T extends Persistable<T>>(obj: T): RawObject {
    const raw: RawObject = {__class__: Object.getPrototypeOf(obj).constructor.name};
    for (let field in obj) {
      raw[field] = this.simplify(obj[field]);
    }
    return raw;
  }
  
  private static simplifyProxy<T extends PersistableByProxy<T,P>, P extends PersistableType>(obj: T): RawProxy {
    return {
      __proxyClass__: Object.getPrototypeOf(obj).constructor.name,
      proxy: Persistence.simplify(obj.proxy())
    };
  }
  
  static desimplify(rawObj: RawType): any {
    switch (this.getType(rawObj)) {
      case 'primitive':
        return rawObj;
      case 'array':
        return Persistence.desimplifyArray(<RawArray>rawObj);
      case 'object':
        return Persistence.desimplifyObject(<RawObject>rawObj);
      case 'proxy':
        return Persistence.desimplifyProxy(<RawProxy>rawObj);
      default:
        throw new Error('Cannot deserialise object of type \'' + this.getType(rawObj) + '\'');
    }
  }
  
  private static desimplifyArray(rawArray: Array<RawType>): Array<any> {
    return rawArray.map(item => this.desimplify(item));
  }
  
  private static desimplifyObject(rawObj: RawObject): any {
    const clazz: AbstractType<Persistable<any>> = this.getClass(rawObj.__class__);
    
    const semiRaw: any = {};
    for (let key in rawObj) {
      if (key !== '__class__') {
        semiRaw[key] = this.desimplify(rawObj[key]);
      }
    }
    
    return Object.setPrototypeOf(semiRaw, clazz.prototype).clone();
  }
  
  private static desimplifyProxy(rawProxy: RawProxy): any {
    const clazz: AbstractType<PersistableByProxy<any,any>> = this.getClass(rawProxy.__proxyClass__);
    return clazz.prototype.deproxy.bind(clazz)(rawProxy.proxy);
  }
  
  private static getClass(className: string): AbstractType<any> {
    const clazz = PersistableClassMap[className];
    if (clazz === undefined) throw new Error('Class \'' + className + '\' not found in PersistableClassMap. Please decorate with @persistable.');
    return clazz;
  }
  
  private static getType(obj: PersistableType | RawType): ObjectType {
    switch (typeof obj) {
      case 'number':
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'undefined':
        return 'primitive';
      case 'object':
        if (obj instanceof Array) return 'array';
        if ((<Persistable<any>>obj).clone || (<RawObject>obj).__class__) return 'object';
        if ((<PersistableByProxy<any,any>>obj).proxy || (<RawProxy>obj).__proxyClass__) return 'proxy';
        return 'primitive'; // dictionary
      default:
        throw new Error('Unrecognised type: ' + typeof obj);
    }
  }
  
}