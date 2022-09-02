import { Component, Input } from "@angular/core";
import { NpcTemplateRepository } from "src/app/dao/npc-template.repository";
import { NpcTemplate } from "src/app/model/npc-template";

@Component({
  selector: 'npc',
  templateUrl: 'npc.component.html'
})
export class NpcComponent {
  
  @Input()
  name: string | undefined;
  
  template: NpcTemplate = new NpcTemplate('acrobat');
  
  constructor(private npcTemplateRepo: NpcTemplateRepository) {
    
  }
  
  save() {
    this.npcTemplateRepo.save(this.template);
  }
  
  retrieve() {
    this.template = this.npcTemplateRepo.retrieve('acrobat');
  }
  
  listKeys() {
    console.log(this.npcTemplateRepo.getKeys());
  }
  
}