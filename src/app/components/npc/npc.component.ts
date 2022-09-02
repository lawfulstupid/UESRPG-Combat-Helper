import { Component, Input } from "@angular/core";
import { NpcTemplateRepository } from "src/app/dao/npc-template.repository";
import { Lookup } from "src/app/model/lookup";
import { NpcTemplate } from "src/app/model/npc-template";

@Component({
  selector: 'npc',
  templateUrl: 'npc.component.html'
})
export class NpcComponent {
  
  template: NpcTemplate = new NpcTemplate('');
  
  lookups: Array<Lookup> = [];
  
  constructor(private npcTemplateRepo: NpcTemplateRepository) {
    
  }
  
  save() {
    this.npcTemplateRepo.save(this.template);
  }
  
  retrieve() {
    this.template = this.npcTemplateRepo.retrieve(this.template.code);
  }
  
  listKeys() {
    this.lookups = this.npcTemplateRepo.getLookups();
    console.log(this.lookups);
  }
  
}