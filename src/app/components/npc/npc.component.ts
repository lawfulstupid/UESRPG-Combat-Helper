import { Component } from "@angular/core";
import { faArrowsUpDownLeftRight, faClose } from "@fortawesome/free-solid-svg-icons";
import { DisplayRequiredValuesComponent } from "src/app/components/common/display-required-values.component";
import { DamageApplication } from "src/app/model/combat/damage";
import { DamageTypeEnum } from "src/app/model/enum/damage-type.enum";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute";
import { CombatProperty } from "src/app/model/property/combat.property";
import { MiscProperties } from "src/app/model/property/misc.property";
import { Modifier } from "src/app/model/property/modifier";
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
  readonly notesProperty = MiscProperties.NOTES;
  
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
  
  onHpChange(hpChange: number) {
    if (hpChange < 0) {
      new DamageApplication(-hpChange, DamageTypeEnum.PHYSICAL, this.npc);
    }
  }
  
  onSpChange(change: number) {
    // Mark stamina as spent this round
    if (change < 0) {
      this.npc.writeData(CombatProperty.STAMINA_SPENT, true);
    }
    // Apply fatigue penalty
    this.npc.getProperty(Attribute.SP).subscribe(sp => {
      if (sp < 0) {
        this.npc.writeData(Modifier.FATIGUE, sp * 10);
      } else {
        this.npc.reset(Modifier.FATIGUE);
      }
    });
  }
  
  close() {
    EventManager.removeNpcEvent.emit(this.npc);
  }
  
}