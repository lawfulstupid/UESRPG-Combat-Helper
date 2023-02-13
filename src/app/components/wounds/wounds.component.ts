import { Component, Input } from "@angular/core";
import { Npc } from "src/app/model/character/npc";
import { CombatProperty } from "src/app/model/property/combat.property";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent {
  
  woundsProperty = CombatProperty.WOUNDS;
  
  @Input()
  npc!: Npc;
  
}