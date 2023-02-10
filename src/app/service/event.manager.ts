import { EventEmitter } from "@angular/core";
import { Npc } from "../model/character/npc";
import { Test } from "../model/combat/test";

export class EventManager {
  
  static addNpcEvent: EventEmitter<Npc> = new EventEmitter();
  static removeNpcEvent: EventEmitter<Npc> = new EventEmitter();
  
  static newRoundEvent: EventEmitter<void> = new EventEmitter();
  
  static exportStageEvent: EventEmitter<void> = new EventEmitter();
  static importStageEvent: EventEmitter<void> = new EventEmitter();
  
  static diceRollEvent: EventEmitter<Test> = new EventEmitter();
  
}