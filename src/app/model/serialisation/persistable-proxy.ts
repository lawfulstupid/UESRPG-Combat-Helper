import { PersistableType } from './types';

export interface PersistableByProxy<T extends PersistableByProxy<T,P>, P extends PersistableType> {
  
  proxy(): P;
  deproxy(proxy: P): T;
  
}