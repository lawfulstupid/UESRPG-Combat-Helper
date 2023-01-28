import { Identifier } from "../identifier/identifier"

export class CharacteristicEnum {

  public static readonly STRENGTH = new Identifier('strength', 'Strength');
  public static readonly ENDURANCE = new Identifier('endurance', 'Endurance');
  public static readonly AGILITY = new Identifier('agility', 'Agility');
  public static readonly INTELLIGENCE = new Identifier('intelligence', 'Intelligence');
  public static readonly WILLPOWER = new Identifier('willpower', 'Willpower');
  public static readonly PERCEPTION = new Identifier('perception', 'Perception');
  public static readonly PERSONALITY = new Identifier('personality', 'Personality');

}