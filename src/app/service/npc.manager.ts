import { Injectable } from "@angular/core";
import { Npc } from "../model/npc";
import { NpcTemplate } from "../model/npc-template";
import { NpcTemplateManager } from "./npc-template.manager";

@Injectable({providedIn: 'root'})
export class NpcManager {
  
  static makeNewNpc(templateKey: string): Npc {
    let template: NpcTemplate = NpcTemplateManager.load(templateKey);
    return new Npc('', template);
  }
  
}