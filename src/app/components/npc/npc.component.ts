import { Component } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Npc } from "src/app/model/character/npc";
import { Attribute } from "src/app/model/property/attribute";
import { Property } from "src/app/model/property/property";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {
  
  readonly attributeEnum = Attribute;
  
  npc!: Npc;
  
  statDisplay(property: Property<number>): Observable<string> {
    return this.npc.getTemplateProperty(property).pipe(mergeMap(statMax => {
      return this.npc.getProperty(property).pipe(map(stat => {
        return '' + stat + '/' + statMax;
      }));
    }));
  }

  addHp() {
    ValueRequestDialog.requestValue<number>(this.npc, Attribute.HP).subscribe(value => {
      this.npc.getProperty(Attribute.HP).subscribe(currentHp => {
        this.npc.writeData(Attribute.HP, currentHp + value);
      });
    });
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}