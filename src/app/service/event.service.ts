import { EventEmitter, Injectable } from "@angular/core";
import { Npc } from "../model/npc";

@Injectable({providedIn: 'root'})
export class EventService {
  
  addNpcEvent: EventEmitter<Npc> = new EventEmitter();
  
}