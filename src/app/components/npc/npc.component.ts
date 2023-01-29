import {Component, Input, OnInit} from "@angular/core";
import { AttributeEnum } from "src/app/model/enum/attribute.enum";
import { Npc as Npc } from "src/app/model/npc";
import { NpcTemplateRepository } from "src/app/service/npc-template-repository";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Identifier } from "src/app/model/lookup/identifier";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {
  
  attributeEnum = AttributeEnum;

  @Input()
  npc!: Npc;

  addHp() {
    ValueRequestDialog.requestValue(this.npc, AttributeEnum.HP, Number.parseInt).subscribe(value => {
      this.npc.getStat(AttributeEnum.HP).subscribe(currentHp => {
        this.npc.writeData(AttributeEnum.HP, currentHp + value);
      });
    });
  }
  
  editMaxHp() {
    ValueRequestDialog.requestValue(this.npc, AttributeEnum.HP, Number.parseInt).subscribe(value => {
      this.npc.template.writeData(AttributeEnum.HP, value);
    });
  }
  
}