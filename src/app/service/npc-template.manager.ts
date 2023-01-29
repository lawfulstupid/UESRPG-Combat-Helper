import { NpcTemplate } from '../model/npc-template';
import { Identifier } from '../model/lookup/identifier';

export class NpcTemplateManager {
  
  private static loadedTemplates: {[key: string]: NpcTemplate} = {};
  
  static save(template: NpcTemplate) {
    localStorage.setItem(template.key, JSON.stringify(template));
  }
  
  static load(key: string): NpcTemplate | null {
    // Try to get loaded version
    let loadedTemplate: NpcTemplate = this.loadedTemplates[key];
    if (loadedTemplate) {
      return loadedTemplate;
    }
    
    // Otherwise check in local storage
    const str = localStorage.getItem(key);
    if (str === null) return null;
    
    const obj = JSON.parse(str);
    let template = new NpcTemplate(obj.key, obj.name, obj.data);
    this.loadedTemplates[key] = template; // store internally
    return template;
  }
  
  static delete(key: string) {
    localStorage.removeItem(key);
    delete this.loadedTemplates[key];
  }
  
  static list(): Array<Identifier> {
    const list: Array<Identifier> = [];
    for (let key of Object.keys(localStorage)) {
      let template: NpcTemplate | null = this.load(key);
      if (template !== null) {
        list.push(new Identifier(key, template.name));
      }
    }
    return list;
  }
  
}