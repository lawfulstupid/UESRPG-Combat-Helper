import { Component, Input } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { AttributeEnum } from "src/app/model/enum/attribute.enum";
import { Property } from "src/app/model/lookup/property";
import { Npc } from "src/app/model/npc";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {
  
  readonly attributeEnum = AttributeEnum;
  
  @Input()
  npc!: Npc;
  
  deleted: boolean = false;
  
  statDisplay(property: Property): Observable<string> {
    return this.npc.getStatMax(property).pipe(mergeMap(statMax => {
      return this.npc.getStat(property).pipe(map(stat => {
        return '' + stat + '/' + statMax;
      }));
    }));
  }

  addHp() {
    ValueRequestDialog.requestValue(this.npc, AttributeEnum.HP, Number.parseInt).subscribe(value => {
      this.npc.getStat(AttributeEnum.HP).subscribe(currentHp => {
        this.npc.writeData(AttributeEnum.HP, currentHp + value);
      });
    });
  }
  
}