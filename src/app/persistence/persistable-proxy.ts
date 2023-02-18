import { PersistableType } from './types';

export interface PersistableByProxy<T extends PersistableByProxy<T,P>, P extends PersistableType> {
  
  proxy(): P;
  deproxy(proxy: P): T;
  // deproxy is always run in a static context, meaning 'this' will refer to the class
  
}