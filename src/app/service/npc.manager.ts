import { ErrorComponent } from "../components/error/error.component";
import { Data } from "../model/character/data-character";
import { Npc } from "../model/character/npc";
import { NpcTemplate } from "../model/character/npc-template";
import { NpcTemplateManager } from "./npc-template.manager";

export class NpcManager {
  
  static create(name?: string, templateKey?: string, data: Data = {}): Npc {
    if (!name || !templateKey) {
      throw ErrorComponent.error("Parameters cannot be null");
    }
    
    const template: NpcTemplate = NpcTemplateManager.load(<string>templateKey);
    return new Npc(<string>name, template, data);
  }
  
}