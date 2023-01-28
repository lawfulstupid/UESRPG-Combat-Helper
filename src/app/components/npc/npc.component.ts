import {Component, OnInit} from "@angular/core";
import { AttributeEnum } from "src/app/model/enum/attribute.enum";
import { Property } from "src/app/model/lookup/property";
import { Npc as Npc } from "src/app/model/npc";
import { NpcTemplateRepository } from "src/app/service/npc-template-repository";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Identifier } from "src/app/model/lookup/identifier";

@Component({
  selector: 'npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {

  key: string = '';
  npc?: Npc;
  
  templateList: Array<Identifier> = [];
  
  ngOnInit() {
    this.templateList = NpcTemplateRepository.list();
  }
  
  retrieve() {
    const template = NpcTemplateRepository.retrieve(this.key);
    if (template !== null) {
      this.npc = new Npc('', template);
    }
  }

  logHp() {
    if (this.npc === undefined) throw new Error();
    this.npc.getStat(AttributeEnum.HP).subscribe(hp => {
      console.log(hp);
    });
  }
  
  addHp() {
    if (this.npc === undefined) throw new Error();
    ValueRequestDialog.requestValue(this.npc, AttributeEnum.HP, Number.parseInt).subscribe(value => {
      if (this.npc === undefined) throw new Error();
      this.npc.data['hitPoints'] += value;
    });
  }
  
}