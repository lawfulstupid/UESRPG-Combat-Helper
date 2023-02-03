import { Component } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute";
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

  testButton() {
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}