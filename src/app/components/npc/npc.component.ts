import { Component } from "@angular/core";
import { Npc } from "src/app/model/character/npc";
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

  testButton() {
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}