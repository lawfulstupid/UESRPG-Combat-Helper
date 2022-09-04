import {Component} from "@angular/core";
import {NpcTemplateService} from '../../service/npc-template.service';
import {Lookup} from "src/app/model/lookup";
import {NpcTemplate} from "src/app/model/npc-template";

@Component({
  selector: 'npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {
  
  template: NpcTemplate = new NpcTemplate('');
  
  lookups: Array<Lookup> = [];
  
  constructor(
    private npcTemplateService: NpcTemplateService
  ) {}
  
  save() {
    this.npcTemplateService.updateTemplate(this.template.code);
  }
  
  retrieve() {
    this.template = this.npcTemplateService.getTemplate(this.template.code);
  }
  
  listKeys() {
    this.lookups = this.npcTemplateService.getLookups();
  }

  logHp() {
    this.template.hp.get().subscribe(hp => {
      console.log(hp);
    });
  }
  
}