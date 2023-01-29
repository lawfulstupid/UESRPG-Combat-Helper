import { Npc } from "../model/npc";
import { NpcTemplate } from "../model/npc-template";
import { ErrorService } from "./error.service";
import { NpcTemplateManager } from "./npc-template.manager";

export class NpcManager {
  
  static create(name?: string, templateKey?: string): Npc {
    if (!name || !templateKey) {
      throw ErrorService.err("Parameters cannot be null");
    }
    
    const template: NpcTemplate = NpcTemplateManager.load(<string>templateKey);
    return new Npc(<string>name, template);
  }
  
}