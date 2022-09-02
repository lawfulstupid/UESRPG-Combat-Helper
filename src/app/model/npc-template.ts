import { Serializable } from "../dao/base.repository";

export class NpcTemplate implements Serializable {
  
  code: string;
  name: string = 'Unnamed';
  maxHp?: number;
  
  constructor(code: string) {
    this.code = code;
  }
  
}