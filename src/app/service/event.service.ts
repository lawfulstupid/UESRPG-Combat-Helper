import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EventService {
  
  addNpcEvent: EventEmitter<string> = new EventEmitter();
  
}