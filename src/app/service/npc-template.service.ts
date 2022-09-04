import {Injectable} from '@angular/core';
import {NpcTemplateRepository} from '../dao/npc-template.repository';
import {NpcTemplate} from '../model/npc-template';
import {Lookup} from '../model/lookup';

@Injectable({providedIn: 'root'})
export class NpcTemplateService {

  private templates: {[key: string]: NpcTemplate};

  constructor(
    private repo: NpcTemplateRepository
  ) {
    this.templates = repo.retrieveAll();
  }

  getTemplate(id: string) {
    return this.templates[id];
  }

  updateTemplate(id: string) {
    this.repo.save(this.getTemplate(id));
  }

  getLookups(): Array<Lookup> {
    const lookups: Array<Lookup> = [];
    for (const key in this.templates) {
      const obj = this.templates[key];
      lookups.push(new Lookup(obj.id, obj.name));
    }
    lookups.sort((a,b) => a.name.localeCompare(b.name));
    return lookups;
  }

}