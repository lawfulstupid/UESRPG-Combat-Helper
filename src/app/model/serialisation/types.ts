import { Enum } from "../enum/enum";
import { Persistable } from "./persistable";
import { PersistableByProxy } from "./persistable-proxy";

export type RawEnum = {__enum__: string, key: string};
export type RawArray = Array<RawType>;
export type RawObject = {__class__: string, [key: string]: RawType};
export type RawProxy = {__proxyClass__: string, proxy: RawType};
export type RawType = undefined | number | string | boolean | RawEnum | RawArray | RawObject | RawProxy;

export type PersistableType = undefined | number | string | boolean | Enum | Array<PersistableType> | Persistable<any> | PersistableByProxy<any,any>;
export type ObjectType = 'primitive' | 'enum' | 'array' | 'object' | 'proxy';