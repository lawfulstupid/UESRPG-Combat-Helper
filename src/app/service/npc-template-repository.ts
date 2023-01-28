import {Serializable} from '../model/serializable';
import { NpcTemplate } from '../model/npc-template';
import { Identifier } from '../model/identifier/identifier';

export abstract class NpcTemplateRepository {
  
  static save(key: string, obj: NpcTemplate) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
  
  static retrieve(key: string): NpcTemplate {
    const str = localStorage.getItem(key);
    if (str === null) return new NpcTemplate(new Identifier(key));
    
    const obj = JSON.parse(str);
    return new NpcTemplate(new Identifier(key, obj.ident.name), obj.data);
  }
  
  static delete(key: string) {
    localStorage.removeItem(key);
  }
  
  static list(): Array<Identifier> {
    const list: Array<Identifier> = [];
    for (let key of Object.keys(localStorage)) {
      let template: NpcTemplate = this.retrieve(key);
      list.push(template.ident);
    }
    return list;
  }
  
}