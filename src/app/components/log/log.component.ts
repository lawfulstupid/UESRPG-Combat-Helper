import { Component } from "@angular/core";
import { Test } from "src/app/model/combat/test";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss']
})
export class LogComponent {
  
  queue: Array<Test> = [];
  
  constructor() {
    EventManager.diceRollEvent.subscribe(test => {
      this.queue.push(test);
    });
  }
  
}