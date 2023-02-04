import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, of } from 'rxjs';
import { Npc } from 'src/app/model/character/npc';
import { Enum } from 'src/app/model/enum/enum';
import { Characteristic } from 'src/app/model/property/characteristic';
import { CombatProperty } from 'src/app/model/property/combat.property';
import { NumericalProperty } from 'src/app/model/property/generic/number.property';
import { Skill } from 'src/app/model/property/skill';
import { Test } from 'src/app/model/test/test';
import { ValueChange } from '../property-input/property-input.component';

@Component({
  selector: 'app-skill-roller',
  templateUrl: './skill-roller.component.html',
  styleUrls: ['./skill-roller.component.scss']
})
export class SkillRollerComponent {
  
  readonly characteristics: Array<Characteristic> = Enum.values(Characteristic);
  readonly skills: Array<Skill> = Enum.values(Skill);
  readonly modifierProperty = CombatProperty.MISC_MODIFIER;
  readonly faClose = faXmark;
  
  @Input()
  npc!: Npc;
  
  selectedSkill?: Skill;
  modifier?: number;
  test?: Test;
  
  displayTargetNumber(skill: NumericalProperty): Observable<string> {
    if (this.npc.hasProperty(skill)) {
      return this.npc.getProperty(skill).pipe(map(value => {
        return '(' + value + ')';
      }));
    } else {
      return of('');
    }
  }
  
  closeResults() {
    this.test = undefined;
  }
  
  setModifier(event: ValueChange<number>) {
    this.modifier = event?.value;
  }
  
  roll() {
    if (this.selectedSkill === undefined) return;
    this.npc.getProperty(this.selectedSkill).subscribe(skill => {
      const targetNumber = skill + (this.modifier || 0);
      this.test = new Test(targetNumber, this.selectedSkill === Skill.COMBAT_STYLE);
    });
  }
  
}
