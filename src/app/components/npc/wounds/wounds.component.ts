import { Component, Input, OnInit } from "@angular/core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Npc } from "src/app/model/character/npc";
import { Wound } from "src/app/model/combat/wound";
import { CombatProperties } from "src/app/model/property/collections/combat";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent implements OnInit {
  
  faClose = faClose;
  
  @Input()
  npc!: Npc;
  
  wounds: Array<Wound> = [];
  
  ngOnInit() {
    this.fetchWounds();
    EventManager.npcWoundedEvent.subscribe(npc => {
      if (npc === this.npc) {
        this.fetchWounds();
      }
    });
  }
  
  fetchWounds() {
    this.npc.get(CombatProperties.WOUNDS).subscribe(wounds => {
      this.wounds = wounds;
    });
  }
  
  remove(woundToRemove: Wound) {
    this.npc.alter(CombatProperties.WOUNDS, wounds => {
      return wounds.filter(wound => wound.guid !== woundToRemove.guid)
    }).then(() => {
      EventManager.npcWoundedEvent.emit(this.npc);
    });
  }
  
}