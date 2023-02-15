import { Component } from "@angular/core";
import { faArrowsUpDownLeftRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { DisplayRequiredValuesComponent } from "src/app/components/common/display-required-values.component";
import { ColorEnum } from "src/app/enum/color.enum";
import { DamageApplication } from "src/app/model/combat/damage";
import { DamageTypeEnum } from "src/app/model/enum/damage-type.enum";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute.property";
import { CombatProperties } from "src/app/model/property/collections/combat";
import { MiscProperties } from "src/app/model/property/collections/misc";
import { Modifier } from "src/app/model/property/modifier.property";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent extends DisplayRequiredValuesComponent {
  
  readonly colorEnum = ColorEnum;
  readonly attributeEnum = Attribute;
  readonly combatEnum = CombatProperties;
  readonly notesProperty = MiscProperties.NOTES;
  
  readonly closeIcon = faClose;
  readonly moveIcon = faArrowsUpDownLeftRight;
  
  protected override requiredProperties(): Array<Property<any>> {
    return [Attribute.SPEED, Attribute.SIZE, CombatProperties.STAMINA_SPENT];
  }
  
  protected override init() {
    EventManager.newRoundEvent.subscribe(() => {
      this.npc.reset(CombatProperties.STAMINA_SPENT);
      this.npc.reset(CombatProperties.ATTACKS_MADE);
      this.npc.alter(Attribute.AP, ap => Math.min(0, ap) + 3);
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
    // Apply fatigue penalty
    this.npc.get(Attribute.SP).subscribe(sp => {
      if (sp < 0) {
        this.npc.put(Modifier.FATIGUE, sp * 10);
      } else {
        this.npc.reset(Modifier.FATIGUE);
      }
    });
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}