import {Serializable} from "../dao/base.repository";
import {RequestableValue} from './requestable-value';

export class NpcTemplate implements Serializable {
  
  code: string;
  name: string = 'Unnamed';
  hp: RequestableValue<number> = new RequestableValue('HP');

  /* Information to store:
   * Characteristics
   * Attributes:
     * Hit Points
     * Wound Threshold
     * Magicka Points
     * Stamina Points
     * Initiative Rating
     * Action Point
     * Speed
     * Size
   * Skills
   * Equipment Options
   * Special Abilities
   * Talents
   * Spells
   * Variants?
   */

  constructor(code: string) {
    this.code = code;
  }
  
}