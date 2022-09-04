import {Injectable} from '@angular/core';
import {NpcTemplateRepository} from '../dao/npc-template.repository';
import {NpcTemplate} from '../model/npc-template';
import {Lookup} from '../model/lookup';
import {SerialCollection} from '../model/serial-collection';

@Injectable({providedIn: 'root'})
export class NpcTemplateService {

  private templates: SerialCollection<NpcTemplate>;

  constructor(
    private repo: NpcTemplateRepository
  ) {
    this.templates = repo.retrieveAll();
  }

  getTemplate(key: string) {
    return this.templates.get(key);
  }

  updateTemplate(key: string, obj: NpcTemplate) {
    this.templates.put(key, obj);
    this.repo.save(key, obj);
  }

  getLookups(): Array<Lookup> {
    const lookups: Array<Lookup> = [];
    for (const key of this.templates.getKeys()) {
      const obj = this.templates.get(key);
      lookups.push(new Lookup(key, obj.name));
    }
    lookups.sort((a,b) => a.name.localeCompare(b.name));
    return lookups;
  }

}