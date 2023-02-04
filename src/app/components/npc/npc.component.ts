import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Attribute } from "src/app/model/property/attribute";
import { CombatProperty } from "src/app/model/property/combat.property";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent implements OnInit {
  
  readonly attributeEnum = Attribute;
  readonly combatEnum = CombatProperty;
  
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
  
  onSpChange(change: number) {
    if (change < 0) {
      this.npc.writeData(CombatProperty.STAMINA_SPENT, true);
    }
  }
  
  testButton() {
    this.npc.getProperty(Attribute.HP).subscribe(hp => {
      this.npc.writeData(Attribute.HP, hp - 1);
    });
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}