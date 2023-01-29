import { NpcTemplate } from '../model/npc-template';
import { Identifier } from '../model/lookup/identifier';
import { Observable, of, throwError } from 'rxjs';

export class NpcTemplateManager {
  
  private static loadedTemplates: {[key: string]: NpcTemplate} = {};
  
  static save(template: NpcTemplate) {
    localStorage.setItem(template.key, JSON.stringify(template));
  }
  
  static load(key: string): NpcTemplate {
    // Try to get loaded version
    let template: NpcTemplate = this.loadedTemplates[key];
    if (template) return template;
    
    // Otherwise check in local storage
    const str = localStorage.getItem(key);
    if (!str) throw new Error('No template found with key \'' + key + '\'');
    
    // Process the saved data
    const obj = JSON.parse(str);
    template = new NpcTemplate(obj.key, obj.name, obj.data);
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
      const template: NpcTemplate = this.load(key);
      list.push(new Identifier(key, template.name));
    }
    return list;
  }
  
}