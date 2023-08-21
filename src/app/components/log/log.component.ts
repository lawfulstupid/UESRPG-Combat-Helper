import { Component } from "@angular/core";
import { Test } from "src/app/model/combat/test";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-log',
  templateUrl: 'log.component.html',
  styleUrls: ['log.component.scss']
})
export class LogComponent {
  
  private static INSTANCE: LogComponent;

  queue: Array<LogEntry> = [];
  
  constructor() {
    LogComponent.INSTANCE = this;
    
    EventManager.diceRollEvent.subscribe(test => {
      this.queue.push(new LogEntry(test.character.name + ' rolled ' + test.property.name + ':', test));
    });
  }
  
  static log(text: string) {
    this.INSTANCE.queue.push(new LogEntry(text));
  }
  
}

export class LogEntry {
  
  timestamp: Date = new Date();
  text: string;
  test?: Test;
  
  constructor(text: string, test?: Test) {
    this.text = text;
    this.test = test;
  }
  
}