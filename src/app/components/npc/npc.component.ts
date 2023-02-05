import { Component } from "@angular/core";
import { faArrowsUpDownLeftRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { DisplayRequiredValuesComponent } from "src/app/components/common/display-required-values.component";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute";
import { CombatProperty } from "src/app/model/property/combat.property";
import { EventManager } from "src/app/service/event.manager";
import { ColorEnum } from "src/app/util/color.enum";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent extends DisplayRequiredValuesComponent {
  
  readonly colorEnum = ColorEnum;
  readonly attributeEnum = Attribute;
  readonly combatEnum = CombatProperty;
  
  readonly closeIcon = faClose;
  readonly moveIcon = faArrowsUpDownLeftRight;
  
  protected override requiredProperties(): Array<Property<any>> {
    return [Attribute.SPEED, Attribute.SIZE, CombatProperty.STAMINA_SPENT];
  }
  
  protected override init() {
    EventManager.newRoundEvent.subscribe(() => {
      this.npc.reset(CombatProperty.STAMINA_SPENT);
      this.npc.reset(CombatProperty.ATTACKS_MADE);
      this.npc.reset(Attribute.AP);
    });
  }
  
  onHpChange(change: number) {
    // TODO: use this to detect wounds
    console.log('HP Change:', change);
  }
  
  onSpChange(change: number) {
    if (change < 0) {
      this.npc.writeData(CombatProperty.STAMINA_SPENT, true);
    }
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}