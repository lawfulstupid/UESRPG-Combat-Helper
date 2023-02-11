import { Component } from "@angular/core";
import { Test } from "src/app/model/combat/test";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-test-log',
  templateUrl: 'test-log.component.html',
  styleUrls: ['test-log.component.scss']
})
export class TestLogComponent {
  
  queue: Array<Test> = [];
  
  constructor() {
    EventManager.diceRollEvent.subscribe(test => {
      this.queue.push(test);
    });
  }
  
}