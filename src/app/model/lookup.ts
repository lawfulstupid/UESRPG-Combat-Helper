import {ID} from './serializable';

export class Lookup {
  
  id: ID;
  name: string;
  
  constructor(id: ID, name: string) {
    this.id = id;
    this.name = name;
  }
  
}