import { EventEmitter } from "@angular/core";
import { Npc } from "../model/character/npc";

export class EventManager {
  
  static addNpcEvent: EventEmitter<Npc> = new EventEmitter();
  static removeNpcEvent: EventEmitter<Npc> = new EventEmitter();
  static newRoundEvent: EventEmitter<void> = new EventEmitter();
  
}