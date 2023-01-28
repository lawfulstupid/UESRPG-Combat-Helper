import { NpcTemplate } from '../model/npc-template';
import { Identifier } from '../model/identifier/identifier';

export abstract class NpcTemplateRepository {
  
  static save(obj: NpcTemplate) {
    localStorage.setItem(obj.key, JSON.stringify(obj));
  }
  
  static retrieve(key: string): NpcTemplate {
    const str = localStorage.getItem(key);
    if (str === null) return new NpcTemplate('');
    
    const obj = JSON.parse(str);
    return new NpcTemplate(obj.key, obj.name, obj.data);
  }
  
  static delete(key: string) {
    localStorage.removeItem(key);
  }
  
  static list(): Array<Identifier> {
    const list: Array<Identifier> = [];
    for (let key of Object.keys(localStorage)) {
      let template: NpcTemplate = this.retrieve(key);
      list.push(new Identifier(key, template.name));
    }
    return list;
  }
  
}