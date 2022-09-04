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

  getTemplate(code: string) {
    return this.templates[code];
  }

  updateTemplate(code: string) {
    this.repo.save(this.getTemplate(code));
  }

  getLookups(): Array<Lookup> {
    const lookups: Array<Lookup> = [];
    for (const key in this.templates) {
      const obj = this.templates[key];
      lookups.push(new Lookup(obj.code, obj.name));
    }
    lookups.sort((a,b) => a.name.localeCompare(b.name));
    return lookups;
  }

}