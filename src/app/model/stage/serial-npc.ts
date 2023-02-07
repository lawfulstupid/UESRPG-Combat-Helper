import { NpcManager } from "src/app/service/npc.manager";
import { Data } from "../character/data-character";
import { Npc } from "../character/npc";

export class SerialNpc {
  
  readonly name: string;
  readonly templateKey: string;
  readonly data: Data;
  
  constructor(npc: Npc) {
    this.name = npc.name;
    this.templateKey = npc.getTemplateKey();
    this.data = npc.getRawDataCopy();
  }
  
  static toNpc(serialNpc: SerialNpc): Npc {
    return NpcManager.create(serialNpc.name, serialNpc.templateKey, serialNpc.data);
  }
  
}