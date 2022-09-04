import {CharacteristicEnum} from './characteristic.enum';
import {NpcSkillEnum} from './npc-skill.enum';

export enum SkillEnum {

  ACROBATICS = 'Acrobatics',
  ALCHEMY = 'Alchemy',
  ALTERATION = 'Alteration',
  ATHLETICS = 'Athletics',
  COMBAT_STYLE = 'Combat Style',
  COMMAND = 'Command',
  COMMERCE = 'Commerce',
  CONJURATION = 'Conjuration',
  DECEIVE = 'Deceive',
  DESTRUCTION = 'Destruction',
  ENCHANT = 'Enchant',
  EVADE = 'Evade',
  ILLUSION = 'Illusion',
  INVESTIGATE = 'Investigate',
  LOGIC = 'Logic',
  LORE = 'Lore',
  MYSTICISM = 'Mysticism',
  NAVIGATE = 'Navigate',
  OBSERVE = 'Observe',
  PERSUADE = 'Persuade',
  RESTORATION = 'Restoration',
  RIDE = 'Ride',
  STEALTH = 'Stealth',
  SUBTERFUGE = 'Subterfuge',
  SURVIVAL = 'Survival'

}

export namespace SkillEnum {

  function getGoverningCharacteristics(skill: SkillEnum): Array<CharacteristicEnum> {
    switch (skill) {
      case SkillEnum.ACROBATICS:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.AGILITY];
      case SkillEnum.ALCHEMY:
        return [CharacteristicEnum.INTELLIGENCE];
      case SkillEnum.ALTERATION:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.ATHLETICS:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.ENDURANCE];
      case SkillEnum.COMBAT_STYLE:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.AGILITY];
      case SkillEnum.COMMAND:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERSONALITY];
      case SkillEnum.COMMERCE:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERSONALITY];
      case SkillEnum.CONJURATION:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.DECEIVE:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERSONALITY];
      case SkillEnum.DESTRUCTION:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.ENCHANT:
        return [CharacteristicEnum.INTELLIGENCE];
      case SkillEnum.EVADE:
        return [CharacteristicEnum.AGILITY];
      case SkillEnum.ILLUSION:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.INVESTIGATE:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERCEPTION];
      case SkillEnum.LOGIC:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERCEPTION];
      case SkillEnum.LORE:
        return [CharacteristicEnum.INTELLIGENCE];
      case SkillEnum.MYSTICISM:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.NAVIGATE:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERCEPTION];
      case SkillEnum.OBSERVE:
        return [CharacteristicEnum.PERCEPTION];
      case SkillEnum.PERSUADE:
        return [CharacteristicEnum.STRENGTH, CharacteristicEnum.PERSONALITY];
      case SkillEnum.RESTORATION:
        return [CharacteristicEnum.WILLPOWER];
      case SkillEnum.RIDE:
        return [CharacteristicEnum.AGILITY];
      case SkillEnum.STEALTH:
        return [CharacteristicEnum.AGILITY, CharacteristicEnum.PERCEPTION];
      case SkillEnum.SUBTERFUGE:
        return [CharacteristicEnum.AGILITY, CharacteristicEnum.INTELLIGENCE];
      case SkillEnum.SURVIVAL:
        return [CharacteristicEnum.INTELLIGENCE, CharacteristicEnum.PERCEPTION];
    }
  }

  function getNpcSkillReplacement(skill: SkillEnum): NpcSkillEnum {
    switch (skill) {
      case SkillEnum.COMBAT_STYLE:
        return NpcSkillEnum.COMBAT;
      case SkillEnum.LOGIC:
      case SkillEnum.LORE:
      case SkillEnum.NAVIGATE:
        return NpcSkillEnum.KNOWLEDGE;
      case SkillEnum.ALTERATION:
      case SkillEnum.DESTRUCTION:
      case SkillEnum.CONJURATION:
      case SkillEnum.MYSTICISM:
      case SkillEnum.ILLUSION:
      case SkillEnum.RESTORATION:
      case SkillEnum.ALCHEMY:
      case SkillEnum.ENCHANT:
        return NpcSkillEnum.MAGIC;
      case SkillEnum.OBSERVE:
      case SkillEnum.INVESTIGATE:
      case SkillEnum.SURVIVAL:
        return NpcSkillEnum.OBSERVE;
      case SkillEnum.ATHLETICS:
      case SkillEnum.ACROBATICS:
      case SkillEnum.RIDE:
        return NpcSkillEnum.PHYSICAL;
      case SkillEnum.COMMAND:
      case SkillEnum.COMMERCE:
      case SkillEnum.DECEIVE:
      case SkillEnum.PERSUADE:
        return NpcSkillEnum.SOCIAL;
      case SkillEnum.STEALTH:
      case SkillEnum.SUBTERFUGE:
        return NpcSkillEnum.STEALTH;
      case SkillEnum.EVADE:
        return NpcSkillEnum.EVADE;
    }
  }

}