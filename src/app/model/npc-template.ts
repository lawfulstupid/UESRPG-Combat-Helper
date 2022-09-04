import {RequestableValue} from './requestable-value';
import {Serializable} from './serializable';

export class NpcTemplate extends Serializable<NpcTemplate> {

  name: string = '';
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
   * Unconventional Skills
   * Equipment Options
   * Special Abilities
   * Talents
   * Spells
   * Variants?
   */

}