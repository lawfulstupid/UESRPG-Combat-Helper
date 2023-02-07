import { Data } from "../model/character/data-character";
import { Npc } from "../model/character/npc";
import { NpcTemplate } from "../model/character/npc-template";
import { ErrorService } from "./error.service";
import { NpcTemplateManager } from "./npc-template.manager";

export class NpcManager {
  
  static create(name?: string, templateKey?: string, data: Data = {}): Npc {
    if (!name || !templateKey) {
      throw ErrorService.err("Parameters cannot be null");
    }
    
    const template: NpcTemplate = NpcTemplateManager.load(<string>templateKey);
    return new Npc(<string>name, template, data);
  }
  
}