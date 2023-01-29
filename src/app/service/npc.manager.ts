import { Injectable } from "@angular/core";
import { Npc } from "../model/npc";
import { NpcTemplate } from "../model/npc-template";
import { EventService } from "./event.service";
import { NpcTemplateRepository } from "./npc-template-repository";

@Injectable({providedIn: 'root'})
export class NpcManager {
  
  static makeNewNpc(templateKey: string): Npc {
    let template: NpcTemplate | null = NpcTemplateRepository.retrieve(templateKey);
    if (template === null) throw new Error();
    return new Npc('', template);
  }
  
}