import { NpcManager } from "src/app/service/npc.manager";
import { Data } from "../character/data-character";
import { Npc } from "../character/npc";
import { Simplified } from "./simple";

export class SimplifiedNpc implements Simplified<Npc> {
  
  readonly name: string;
  readonly templateKey: string;
  readonly data: Data;
  
  constructor(npc: Npc) {
    this.name = npc.name;
    this.templateKey = npc.getTemplateKey();
    this.data = npc.getRawDataCopy();
  }
  
  desimplify(): Npc {
    return NpcManager.create(this.name, this.templateKey, this.data);
  }
  
}