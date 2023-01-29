import { Property } from "../lookup/property";

export class CharacteristicEnum {

  public static readonly STRENGTH = new Property('strength', 'Strength');
  public static readonly ENDURANCE = new Property('endurance', 'Endurance');
  public static readonly AGILITY = new Property('agility', 'Agility');
  public static readonly INTELLIGENCE = new Property('intelligence', 'Intelligence');
  public static readonly WILLPOWER = new Property('willpower', 'Willpower');
  public static readonly PERCEPTION = new Property('perception', 'Perception');
  public static readonly PERSONALITY = new Property('personality', 'Personality');

}