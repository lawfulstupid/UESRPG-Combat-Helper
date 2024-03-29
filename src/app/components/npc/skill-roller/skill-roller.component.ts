import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, of } from 'rxjs';
import { FetchMethod } from 'src/app/model/character/data-character';
import { Npc } from 'src/app/model/character/npc';
import { Test } from 'src/app/model/combat/test';
import { Enum } from 'src/app/model/enum/enum';
import { Rollable } from 'src/app/model/property/abstract/rollable.property';
import { Characteristic } from 'src/app/model/property/characteristic.property';
import { Modifier } from 'src/app/model/property/modifier.property';
import { NpcSkill } from 'src/app/model/property/skill-npc.property';
import { Skill } from 'src/app/model/property/skill.property';
import { SearchUtil } from 'src/app/util/search.util';

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
      return this.npc.get(skill, FetchMethod.ERROR).pipe(map(value => '(' + value + ')'));
    }
    
    if (skill instanceof Skill) {
      const npcSkill: NpcSkill = skill.npcSkill;
      if (this.npc.hasProperty(npcSkill)) {
        return this.npc.get(npcSkill, FetchMethod.ERROR).pipe(map(value => '(' + value + ')'));
      }
    }
    
    return of('');
  }
  
  closeResults() {
    this.test = undefined;
  }
  
  roll() {
    if (this.selectedSkill === undefined) return;
    const skill: Rollable = this.selectedSkill; // cast away undefined
    Test.make(this.npc, skill, {isAttack: skill.key === Skill.COMBAT_STYLE.key}).subscribe(test => {
      this.test = test;
    });
  }
  
}
