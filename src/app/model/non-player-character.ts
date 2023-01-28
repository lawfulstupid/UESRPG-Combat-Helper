import { Character } from "./character";
import { Identifier } from "./identifier/identifier";
import { NpcTemplate } from "./npc-template";

export class NonPlayerCharacter extends Character {
  
  template: NpcTemplate;
  data: object = {};
  
  constructor(name: string, template?: NpcTemplate) {
    super(name);
    if (template) {
      this.template = template;
    } else {
      this.template = new NpcTemplate(new Identifier(name, name));
    }
  }
  
}