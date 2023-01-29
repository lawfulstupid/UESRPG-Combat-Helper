import { EventEmitter } from "@angular/core";
import { Npc } from "../model/npc";

export class EventManager {
  
  static addNpcEvent: EventEmitter<Npc> = new EventEmitter();
  
}