import { Data } from "../character/data-character";
import { Npc } from "../character/npc";

export class SerialNpc {
  
  name: string;
  templateKey: string;
  data: Data;
  
  constructor(npc: Npc) {
    this.name = npc.name;
    this.templateKey = npc.getTemplateKey();
    this.data = npc.getRawDataCopy();
  }
  
}