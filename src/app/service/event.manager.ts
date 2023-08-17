import { EventEmitter } from "@angular/core";
import { Npc } from "../model/character/npc";
import { Test } from "../model/combat/test";

export class EventManager {
  
  static addNpcEvent: EventEmitter<Npc> = new EventEmitter();
  static removeNpcEvent: EventEmitter<Npc> = new EventEmitter();
  static npcWoundedEvent: EventEmitter<Npc> = new EventEmitter();
  
  static newRoundEvent: EventEmitter<void> = new EventEmitter();
  
  static saveSessionEvent: EventEmitter<string> = new EventEmitter();
  static loadSessionEvent: EventEmitter<string> = new EventEmitter();
  static reloadSessionListEvent: EventEmitter<void> = new EventEmitter();
  
  static diceRollEvent: EventEmitter<Test> = new EventEmitter();
  
}