import {CharacteristicEnum} from './characteristic.enum';

export enum NpcSkillEnum {

  COMBAT = 'Combat',
  KNOWLEDGE = 'Knowledge',
  MAGIC = 'Magic',
  OBSERVE = 'Observe',
  PHYSICAL = 'Physical',
  SOCIAL = 'Social',
  STEALTH = 'Stealth',
  EVADE = 'Evade'

}

export namespace NpcSkillEnum {

  function getGoverningCharacteristics(skill: NpcSkillEnum): Array<CharacteristicEnum> {
    switch (skill) {
      case NpcSkillEnum.COMBAT:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.AGILITY];
      case NpcSkillEnum.KNOWLEDGE:
        return [CharacteristicEnum.INTELLIGENCE];
      case NpcSkillEnum.MAGIC:
        return [CharacteristicEnum.WILLPOWER];
      case NpcSkillEnum.OBSERVE:
        return [CharacteristicEnum.PERCEPTION];
      case NpcSkillEnum.PHYSICAL:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.ENDURANCE];
      case NpcSkillEnum.SOCIAL:
        return [CharacteristicEnum.PERSONALITY];
      case NpcSkillEnum.STEALTH:
        return [CharacteristicEnum.AGILITY];
      case NpcSkillEnum.EVADE:
        return [CharacteristicEnum.AGILITY];
    }
  }

}