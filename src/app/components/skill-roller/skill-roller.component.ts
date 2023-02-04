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
import { ObservableUtil } from 'src/app/util/observable.util';
import { SearchUtil } from 'src/app/util/search.util';
import { ValueChange } from '../property-input/property-input.component';

@Component({
  selector: 'app-skill-roller',
  templateUrl: './skill-roller.component.html',
  styleUrls: ['./skill-roller.component.scss']
})
export class SkillRollerComponent {
  
  readonly modifierProperty = CombatProperty.MISC_MODIFIER;
  readonly faClose = faXmark;
  
  @Input()
  npc!: Npc;
  
  skills: Array<NumericalProperty> = [];
  characteristics: Array<NumericalProperty> = [];
  
  selectedSkill?: Skill;
  modifier?: number;
  test?: Test;
  
  constructor() {
    this.filterSkills('');
  }
  
  filterSkills(search: string) {
    this.characteristics = Enum.values<Characteristic>(Characteristic).filter(characteristic => {
      return SearchUtil.matchAny(search, characteristic.name);
    });
    this.skills = Enum.values<Skill>(Skill).filter(skill => {
      return SearchUtil.matchAny(search, skill.name);
    });
  }
  
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
    const skill: Skill = <Skill>this.selectedSkill; // cast away undefined
    
    // Tries a few strategies to get the TN:
    ObservableUtil.coalesce(
      () => this.npc.getPropertySilent(skill),    // 1. Check for PC skill
      () => this.npc.getProperty(skill.npcSkill), // 2. Check for NPC skill, ask user if missing
      () => this.npc.getProperty(skill)           // 3. Check for PC skill, ask use if missing. This fires if user clicks 'Cancel' on NPC skill value request dialog
    ).subscribe(skill => {
        const targetNumber = skill + (this.modifier || 0);
        this.test = new Test(targetNumber, this.selectedSkill === Skill.COMBAT_STYLE);
    });
  }
  
}
