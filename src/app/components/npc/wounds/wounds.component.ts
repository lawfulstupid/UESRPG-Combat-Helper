import { Component, Input } from "@angular/core";
import { Npc } from "src/app/model/character/npc";
import { CombatProperties } from "src/app/model/property/collections/combat";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent {
  
  woundsProperty = CombatProperties.WOUNDS;
  
  @Input()
  npc!: Npc;
  
}