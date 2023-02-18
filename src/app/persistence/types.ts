import { Persistable } from "./persistable";
import { PersistableByProxy } from "./persistable-proxy";

export type RawArray = Array<RawType>;
export type RawObject = {__class__: string, [key: string]: RawType};
export type RawProxy = {__proxyClass__: string, proxy: RawType};
export type RawType = undefined | number | string | boolean | RawArray | RawObject | RawProxy;

export type PersistableType = undefined | number | string | boolean | Array<PersistableType> | Persistable<any> | PersistableByProxy<any,any>;

export enum PersistenceType {
  PRIMITIVE, ARRAY, OBJECT, PROXY
}