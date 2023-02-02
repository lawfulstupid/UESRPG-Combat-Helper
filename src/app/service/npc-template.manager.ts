import { NpcTemplate } from '../model/character/npc-template';
import { Identifier } from '../model/property/identifier';
import { ErrorService } from './error.service';

export class NpcTemplateManager {
  
  private static loadedTemplates: {[key: string]: NpcTemplate} = {};
  
  static create(key?: string, name?: string, data: any = {}): NpcTemplate {
    if (!key || !name) {
      throw ErrorService.err('Parameters cannot be null');
    }
    
    if (this.exists(key)) {
      throw ErrorService.err('Template with key \'' + key + '\' already exists')
    } else {
      return this.save(new NpcTemplate(<string>key, <string>name, data));
    }
  }
  
  static update(template: NpcTemplate): NpcTemplate {
    if (this.exists(template.key)) {
      return this.save(template);
    } else {
      throw ErrorService.err("Template does not exist in database");
    }
  }
  
  private static save(template: NpcTemplate): NpcTemplate {
    this.loadedTemplates[template.key] = template; // update internally (for new templates)
    localStorage.setItem(template.key, JSON.stringify(template));
    return template;
  }
  
  static exists(templateKey: string): boolean {
    for (let key of Object.keys(localStorage)) {
      if (key === templateKey) return true;
    }
    return false;
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
    return list.sort((a,b) => a.name.localeCompare(b.name));
  }
  
}