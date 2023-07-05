import { NpcTemplate } from '../model/character/npc-template';
import { Identifier } from '../model/identifier';
import { CachedLocalStorage } from './cached.local-storage';

export class NpcTemplateManager extends CachedLocalStorage<NpcTemplate> {
  
  override readonly MASTER_KEY: string = 'template';
  
  protected override construct(obj: any): NpcTemplate {
    return new NpcTemplate(obj.key, obj.name, obj.data);
  }
  
  protected override merge(existing: NpcTemplate, template: NpcTemplate): void {
    existing.name = template.name;
    existing.putData(template.getData());
  }
  
  /* STATIC ACCESS */
  
  static readonly instance: NpcTemplateManager = new NpcTemplateManager();
  
  static create(template: NpcTemplate): NpcTemplate {
    return this.instance.create(template);
  }
  
  static update(template: NpcTemplate): NpcTemplate {
    return this.instance.update(template);
  }
  
  static load(key: string): NpcTemplate {
    return this.instance.load(key);
  }
  
  static delete(key: string) {
    return this.instance.delete(key);
  }
  
  static exists(key: string): boolean {
    return this.instance.exists(key);
  }
  
  static list(): Array<Identifier> {
    return this.instance.list();
  }
  
}