import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, of } from 'rxjs';
import { Npc } from 'src/app/model/character/npc';
import { Test } from 'src/app/model/combat/test';
import { Enum } from 'src/app/model/enum/enum';
import { Rollable } from 'src/app/model/property/abstract/rollable';
import { Characteristic } from 'src/app/model/property/characteristic';
import { Modifier } from 'src/app/model/property/modifier';
import { Skill } from 'src/app/model/property/skill';
import { NpcSkill } from 'src/app/model/property/skill-npc';
import { ObservableUtil } from 'src/app/util/observable.util';
import { SearchUtil } from 'src/app/util/search.util';
import { ValueChange } from '../property-input/property-input.component';

@Component({
  selector: 'app-skill-roller',
  templateUrl: './skill-roller.component.html',
  styleUrls: ['./skill-roller.component.scss']
})
export class SkillRollerComponent {
  
  readonly miscModifierProperty = Modifier.MISC;
  readonly closeIcon = faXmark;
  
  @Input()
  npc!: Npc;
  
  skills: Array<Skill> = [];
  characteristics: Array<Characteristic> = [];
  
  selectedSkill?: Rollable;
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
  
  displayTargetNumber(skill: Rollable): Observable<string> {
    if (this.npc.hasProperty(skill)) {
      return this.npc.getPropertySilent(skill).pipe(map(value => '(' + value + ')'));
    }
    
    const npcSkill = this.npcSkill(skill);
    if (this.npc.hasProperty(npcSkill)) {
      return this.npc.getPropertySilent(npcSkill).pipe(map(value => '(' + value + ')'));
    }
    
    return of('');
  }
  
  closeResults() {
    this.test = undefined;
  }
  
  setModifier(event: ValueChange<number>) {
    this.modifier = event?.value;
  }
  
  roll() {
    if (this.selectedSkill === undefined) return;
    const skill: Rollable = this.selectedSkill; // cast away undefined
    
    // Tries a few strategies to get the TN:
    ObservableUtil.coalesce(
      () => this.npc.getPropertySilent(skill),          // 1. Check for PC skill
      () => this.npc.getProperty(this.npcSkill(skill)), // 2. Check for NPC skill, ask user if missing
      () => this.npc.getProperty(skill)                 // 3. Check for PC skill, ask use if missing. This fires if user clicks 'Cancel' on NPC skill value request dialog
    ).subscribe(skillTN => {
        const targetNumber = skillTN + (this.modifier || 0);
        Test.make(skill, targetNumber, this.npc, this.selectedSkill === Skill.COMBAT_STYLE).subscribe(test => {
          this.test = test;
        });
    });
  }
  
  private npcSkill(skill: Rollable): NpcSkill | undefined {
    if (skill instanceof Skill) {
      return skill.npcSkill;
    } else {
      return undefined;
    }
  }
  
}
