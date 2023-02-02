import { NumericalProperty } from "../property/numerical-property";

export class CharacteristicEnum {

  public static readonly STRENGTH = new NumericalProperty('strength', 'Strength');
  public static readonly ENDURANCE = new NumericalProperty('endurance', 'Endurance');
  public static readonly AGILITY = new NumericalProperty('agility', 'Agility');
  public static readonly INTELLIGENCE = new NumericalProperty('intelligence', 'Intelligence');
  public static readonly WILLPOWER = new NumericalProperty('willpower', 'Willpower');
  public static readonly PERCEPTION = new NumericalProperty('perception', 'Perception');
  public static readonly PERSONALITY = new NumericalProperty('personality', 'Personality');

}