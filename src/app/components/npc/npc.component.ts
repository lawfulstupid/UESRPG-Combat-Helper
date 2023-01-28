import {Component} from "@angular/core";
import { AttributeEnum } from "src/app/model/enum/attribute.enum";
import { Identifier } from "src/app/model/identifier/identifier";
import { NonPlayerCharacter } from "src/app/model/non-player-character";
import {NpcTemplate} from "src/app/model/npc-template";
import { NpcTemplateRepository } from "src/app/service/npc-template-repository";

@Component({
  selector: 'npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {

  key: string = '';
  npc: NonPlayerCharacter = new NonPlayerCharacter('NPC');
  
  idents: Array<Identifier> = [];
  
  save() {
    NpcTemplateRepository.save(this.key, this.npc.template);
  }
  
  retrieve() {
    this.npc.template = NpcTemplateRepository.retrieve(this.key);
  }
  
  listKeys() {
    this.idents = NpcTemplateRepository.list();
  }

  logHp() {
    this.npc.template.get(AttributeEnum.HP).subscribe(hp => {
      console.log(hp);
    });
  }
  
}