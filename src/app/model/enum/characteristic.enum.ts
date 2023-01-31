import { Property } from "../lookup/property";

export class CharacteristicEnum {

  public static readonly STRENGTH = new Property<number>('strength', 'Strength');
  public static readonly ENDURANCE = new Property<number>('endurance', 'Endurance');
  public static readonly AGILITY = new Property<number>('agility', 'Agility');
  public static readonly INTELLIGENCE = new Property<number>('intelligence', 'Intelligence');
  public static readonly WILLPOWER = new Property<number>('willpower', 'Willpower');
  public static readonly PERCEPTION = new Property<number>('perception', 'Perception');
  public static readonly PERSONALITY = new Property<number>('personality', 'Personality');

}