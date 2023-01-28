import { NpcTemplate } from '../model/npc-template';
import { Property } from '../model/property';

export abstract class NpcTemplateRepository {
  
  static save(obj: NpcTemplate) {
    localStorage.setItem(obj.key, JSON.stringify(obj));
  }
  
  static retrieve(key: string): NpcTemplate | null{
    const str = localStorage.getItem(key);
    if (str === null) return null;
    
    const obj = JSON.parse(str);
    return new NpcTemplate(obj.key, obj.name, obj.data);
  }
  
  static delete(key: string) {
    localStorage.removeItem(key);
  }
  
  static list(): Array<Property> {
    const list: Array<Property> = [];
    for (let key of Object.keys(localStorage)) {
      let template: NpcTemplate | null = this.retrieve(key);
      if (template !== null) {
        list.push(new Property(key, template.name));
      }
    }
    return list;
  }
  
}