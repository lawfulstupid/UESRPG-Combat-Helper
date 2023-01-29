import { Identifier } from '../model/lookup/identifier';
import { NpcTemplate } from '../model/npc-template';
import { ErrorService } from './error.service';

export class NpcTemplateManager {
  
  private static loadedTemplates: {[key: string]: NpcTemplate} = {};
  
  static create(key?: string, name?: string) {
    if (!key || !name) {
      ErrorService.err('Parameters cannot be null');
    }
    
    const template = new NpcTemplate(<string>key, <string>name);
    this.save(template);
  }
  
  static save(template: NpcTemplate) {
    this.loadedTemplates[template.key] = template; // update internally (for new templates)
    localStorage.setItem(template.key, JSON.stringify(template));
  }
  
  static load(key: string): NpcTemplate {
    // Try to get loaded version
    let template: NpcTemplate = this.loadedTemplates[key];
    if (template) return template;
    
    // Otherwise check in local storage
    template = this.loadFromLocalStorage(key);
    this.loadedTemplates[key] = template; // store internally
    return template;
  }
  
  private static loadFromLocalStorage(key: string): NpcTemplate {
    const str = localStorage.getItem(key);
    if (!str) throw new Error('No template found with key \'' + key + '\'');
    const obj = JSON.parse(str);
    return new NpcTemplate(obj.key, obj.name, obj.data);
  }
  
  static delete(key: string) {
    localStorage.removeItem(key);
    delete this.loadedTemplates[key];
  }
  
  static list(): Array<Identifier> {
    const list: Array<Identifier> = [];
    for (let key of Object.keys(localStorage)) {
      const template: NpcTemplate = this.loadFromLocalStorage(key);
      list.push(new Identifier(key, template.name));
    }
    return list;
  }
  
}