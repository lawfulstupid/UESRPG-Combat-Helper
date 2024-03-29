import { DummyProperty } from "./abstract/dummy.property";
import { TemplateRole } from "./abstract/property";
import { Rollable } from "./abstract/rollable.property";

export class Characteristic extends Rollable {
  
  override DOMAIN = 'characteristic';

  public static readonly STRENGTH = new Characteristic('strength', 'Strength');
  public static readonly ENDURANCE = new Characteristic('endurance', 'Endurance');
  public static readonly AGILITY = new Characteristic('agility', 'Agility');
  public static readonly INTELLIGENCE = new Characteristic('intelligence', 'Intelligence');
  public static readonly WILLPOWER = new Characteristic('willpower', 'Willpower');
  public static readonly PERCEPTION = new Characteristic('perception', 'Perception');
  public static readonly PERSONALITY = new Characteristic('personality', 'Personality');
  
  public readonly BONUS = new DummyProperty<number>(this.name + ' Bonus').derivedFrom(this, score => Math.floor(score/10));
  
  protected constructor(key: string, name: string) {
    super(key, name, TemplateRole.REFERENCE);
  }

}