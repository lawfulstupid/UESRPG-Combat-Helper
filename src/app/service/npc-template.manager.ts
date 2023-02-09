import { ErrorComponent } from '../components/error/error.component';
import { NpcTemplate } from '../model/character/npc-template';
import { Identifier } from '../model/identifier';

export class NpcTemplateManager {
  
  private static loadedTemplates: {[key: string]: NpcTemplate} = {};
  
  static create(template: NpcTemplate): NpcTemplate {
    if (this.exists(template.key)) {
      throw ErrorComponent.error('Template with key \'' + template.key + '\' already exists');
    }
    
    this.loadedTemplates[template.key] = template; // save internally
    return this.save(template);
  }
  
  static update(template: NpcTemplate): NpcTemplate {
    if (!this.exists(template.key)) {
      throw ErrorComponent.error("Template does not exist in database");
    }
    
    // Merge with existing template
    const existing: NpcTemplate = this.load(template.key);
    existing.name = template.name;
    existing.replaceData(template.getRawDataCopy());
    return this.save(existing);
  }
  
  // save externally
  private static save(template: NpcTemplate): NpcTemplate {
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