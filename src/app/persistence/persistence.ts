import { AbstractType } from "@angular/core";
import { PersistableClassMap } from "./class-mapping";
import { Persistable, PersistableByProxy } from "./persistable";
import { PersistableType, PersistenceType, RawArray, RawObject, RawProxy, RawType } from "./types";

export abstract class Persistence {
  
  /* TW: FOUL EVIL CURSED CODE */
  
  static serialise(obj: PersistableType): string {
    return JSON.stringify(this.simplify(obj));
  }
  
  static deserialise<T extends PersistableType>(str: string): T {
    return this.desimplify(JSON.parse(str));
  }
  
  private static simplify(obj: any): RawType {
    switch (this.getType(obj)) {
      case PersistenceType.PRIMITIVE:
        return <RawType>obj;
      case PersistenceType.ARRAY:
        return this.simplifyArray(<Array<PersistableType>>obj);
      case PersistenceType.OBJECT:
        return this.simplifyObject(<Persistable<any>>obj);
      case PersistenceType.PROXY:
        return this.simplifyProxy(<PersistableByProxy<any,any>>obj);
      default:
        throw new Error('Cannot serialise object of type \'' + this.getType(obj) + '\'');
    }
  }
  
  private static simplifyArray<T extends PersistableType>(obj: Array<T>): RawArray {
    return obj.map(item => this.simplify(item));
  }
  
  private static simplifyObject<T extends Persistable<T>>(obj: T): RawObject {
    const raw: RawObject = {__class__: PersistableClassMap.getIdentOfObject(obj)};
    for (let field in obj) {
      raw[field] = this.simplify(obj[field]);
    }
    return raw;
  }
  
  private static simplifyProxy<T extends PersistableByProxy<T,P>, P extends PersistableType>(obj: T): RawProxy {
    return {
      __proxyClass__: PersistableClassMap.getIdentOfObject(obj),
      proxy: this.simplify(obj.proxy())
    };
  }
  
  private static desimplify(rawObj: RawType): any {
    switch (this.getType(rawObj)) {
      case PersistenceType.PRIMITIVE:
        return rawObj;
      case PersistenceType.ARRAY:
        return this.desimplifyArray(<RawArray>rawObj);
      case PersistenceType.OBJECT:
        return this.desimplifyObject(<RawObject>rawObj);
      case PersistenceType.PROXY:
        return this.desimplifyProxy(<RawProxy>rawObj);
      default:
        throw new Error('Cannot deserialise object of type \'' + this.getType(rawObj) + '\'');
    }
  }
  
  private static desimplifyArray(rawArray: Array<RawType>): Array<any> {
    return rawArray.map(item => this.desimplify(item));
  }
  
  private static desimplifyObject(rawObj: RawObject): any {
    const semiRaw: any = {};
    for (let key in rawObj) {
      if (key !== '__class__') {
        semiRaw[key] = this.desimplify(rawObj[key]);
      }
    }
    
    const clazz: AbstractType<Persistable<any>> = PersistableClassMap.getClass(rawObj.__class__);
    return Object.setPrototypeOf(semiRaw, clazz.prototype).clone();
  }
  
  private static desimplifyProxy(rawProxy: RawProxy): any {
    const clazz: AbstractType<PersistableByProxy<any,any>> = PersistableClassMap.getClass(rawProxy.__proxyClass__);
    return clazz.prototype.deproxy.bind(clazz)(rawProxy.proxy);
  }
  
  private static getType(obj: PersistableType | RawType): PersistenceType {
    switch (typeof obj) {
      case 'number':
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'undefined':
        return PersistenceType.PRIMITIVE;
      case 'object':
        if (obj instanceof Array) return PersistenceType.ARRAY;
        if ((<Persistable<any>>obj).clone || (<RawObject>obj).__class__) return PersistenceType.OBJECT;
        if ((<PersistableByProxy<any,any>>obj).proxy || (<RawProxy>obj).__proxyClass__) return PersistenceType.PROXY;
        return PersistenceType.PRIMITIVE; // dictionary
      default:
        throw new Error('Unrecognised type: ' + typeof obj);
    }
  }
  
}