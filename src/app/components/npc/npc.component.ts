import { Component, Input } from "@angular/core";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { AttributeEnum } from "src/app/model/enum/attribute.enum";
import { Npc } from "src/app/model/npc";

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