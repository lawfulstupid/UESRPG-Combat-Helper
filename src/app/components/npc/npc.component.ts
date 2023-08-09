import { Component } from "@angular/core";
import { faArrowsUpDownLeftRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { DisplayRequiredValuesComponent } from "src/app/components/common/display-required-values.component";
import { ColorEnum } from "src/app/enum/color.enum";
import { DamageApplication } from "src/app/model/combat/damage";
import { DamageTypeEnum } from "src/app/model/enum/damage-type.enum";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute.property";
import { Characteristic } from "src/app/model/property/characteristic.property";
import { CombatProperties } from "src/app/model/property/collections/combat";
import { MiscProperties } from "src/app/model/property/collections/misc";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent extends DisplayRequiredValuesComponent {
  
  readonly colorEnum = ColorEnum;
  readonly characteristicEnum = Characteristic;
  readonly attributeEnum = Attribute;
  readonly combatEnum = CombatProperties;
  readonly notesProperty = MiscProperties.NOTES;
  
  readonly closeIcon = faClose;
  readonly moveIcon = faArrowsUpDownLeftRight;
  
  protected override requiredProperties(): Array<Property<any>> {
    return [Attribute.SPEED, Attribute.SIZE, CombatProperties.STAMINA_SPENT, Characteristic.STRENGTH]; // TODO #17: remove STRENGTH
  }
  
  protected override init() {
    EventManager.newRoundEvent.subscribe(() => {
      this.npc.reset(CombatProperties.STAMINA_SPENT);
      this.npc.reset(CombatProperties.ATTACKS_MADE);
      this.npc.alter(Attribute.ACTION_POINTS, ap => Math.min(0, ap) + 3);
    });
  }
  
  onHpChange(hpChange: number) {
    if (hpChange < 0) {
      new DamageApplication(-hpChange, DamageTypeEnum.PHYSICAL, this.npc);
    }
  }
  
  onSpChange(change: number) {
    // Mark stamina as spent this round
    if (change < 0) {
      this.npc.put(CombatProperties.STAMINA_SPENT, true);
    }
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}