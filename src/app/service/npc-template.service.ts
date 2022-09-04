import {Injectable} from '@angular/core';
import {NpcTemplateRepository} from '../dao/npc-template.repository';
import {NpcTemplate} from '../model/npc-template';

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

}