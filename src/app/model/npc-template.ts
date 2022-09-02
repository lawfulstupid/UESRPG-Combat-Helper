import { Serializable } from "../dao/base.repository";

export class NpcTemplate implements Serializable {
  
  code: string;
  name: string | undefined;
  maxHp: number | undefined;
  
  constructor(code: string) {
    this.code = code;
  }
  
}