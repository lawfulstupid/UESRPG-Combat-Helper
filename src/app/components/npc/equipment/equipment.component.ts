import { Component, Input } from "@angular/core";
import { Npc } from "src/app/model/character/npc";

@Component({
  selector: 'app-equipment',
  templateUrl: 'equipment.component.html',
  styleUrls: ['equipment.component.scss']
})
export class EquipmentComponent {
  
  @Input()
  npc!: Npc;
  
}