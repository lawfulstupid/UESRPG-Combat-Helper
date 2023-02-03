import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Attribute } from "src/app/model/property/attribute";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {
  
  readonly attributeEnum = Attribute;
  
  npc!: Npc;
  loaded: boolean = false;
  
  ngOnInit() {
    // Make sure all required values are accounted for
    // TODO: Gather missing variables and request them all on one screen
    forkJoin(
      NpcTemplate.REQUIRED_PROPERTIES.map(this.npc.getProperty.bind(this.npc))
    ).subscribe(values => {
      console.log(this.npc.name + ' loaded');
      this.loaded = true;
    });
  }
  
  testButton() {
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}