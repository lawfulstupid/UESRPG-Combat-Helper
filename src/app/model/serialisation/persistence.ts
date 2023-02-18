import { Enum } from "../enum/enum";
import { Persistable, PersistableClassMap, PersistableType } from "./persistable";

export abstract class Persistence {
  
  /* TW: FOUL EVIL CURSED CODE */
  
  static serialise(obj: PersistableType): string {
    return JSON.stringify(this.simplify(obj));
  }
  
  static deserialise(str: string): PersistableType {
    return this.desimplify(JSON.parse(str));
  }
  
  static simplify(obj: any): RawType {
    switch (this.getType(obj)) {
      case 'primitive':
        return <RawType>obj;
      case 'enum':
        return Persistence.simplifyEnum(<Enum>obj);
      case 'array':
        return Persistence.simplifyArray(<Array<PersistableType>>obj);
      case 'object':
        return Persistence.simplifyObject(<Persistable<any>>obj);
      default:
        throw new Error('Cannot serialise object of type \'' + this.getType(obj) + '\'');
    }
  }
  
  private static simplifyEnum<T extends Enum>(obj: T): RawEnum {
    return {
      __enum__: Object.getPrototypeOf(obj).constructor.name,
      key: obj.key()
    };
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
  
  static desimplify(rawObj: RawType): any {
    switch (this.getType(rawObj)) {
      case 'primitive':
        return rawObj;
      case 'enum':
        return Persistence.desimplifyEnum(<RawEnum>rawObj);
      case 'array':
        return Persistence.desimplifyArray(<RawArray>rawObj);
      case 'object':
        return Persistence.desimplifyObject(<RawObject>rawObj);
      default:
        throw new Error('Cannot deserialise object of type \'' + this.getType(rawObj) + '\'');
    }
  }
  
  private static desimplifyEnum(rawEnum: RawEnum): Enum {
    const clazz = Enum.allEnumsMap[rawEnum.__enum__];
    const value = clazz.value(rawEnum.key);
    if (value === undefined) {
      throw new Error('Key \'' + rawEnum.key + '\' does not exist on ' + clazz.name);
    }
    return value;
  }
  
  private static desimplifyArray(rawArray: Array<RawType>): Array<any> {
    return rawArray.map(item => this.desimplify(item));
  }
  
  private static desimplifyObject(rawObj: RawObject): any {
    const clazz = PersistableClassMap[rawObj.__class__];
    if (clazz === undefined) throw new Error('Class \'' + rawObj.__class__ + '\' not found in PersistableClassMap. Please decorate with @persistable.');
    
    const semiRaw: any = {};
    for (let key in rawObj) {
      if (key !== '__class__') {
        semiRaw[key] = this.desimplify(rawObj[key]);
      }
    }
    
    return clazz.prototype.clone.bind(semiRaw)();
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
        if (obj instanceof Enum || (<RawEnum>obj).__enum__ !== undefined) return 'enum';
        if (obj instanceof Array) return 'array';
        return 'object';
      default:
        throw new Error('Unrecognised type: ' + typeof obj);
    }
  }
  
}

type RawEnum = {__enum__: string, key: string};
type RawArray = Array<RawType>;
type RawObject = {__class__: string, [key: string]: RawType};
type RawType = number | string | boolean | RawEnum | RawArray | RawObject;
type ObjectType = 'primitive' | 'enum' | 'array' | 'object';