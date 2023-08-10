import { TemplateRole } from "./abstract/property";
import { Rollable } from "./abstract/rollable.property";
import { Attribute } from "./attribute.property";
import { CombatProperties } from "./collections/combat";
import { NumericalProperty } from "./types/number.property";

export abstract class AbstractModifier extends NumericalProperty {
  
  override DOMAIN = 'modifier';
  
  protected constructor(key: string, name: string, templateRole: TemplateRole, private applications: Array<Rollable> | 'all' = 'all') {
    super(key, name, templateRole, 0);
  }
  
  appliesTo(skill: Rollable): boolean {
    if (this.applications === 'all') {
      return true;
    } else {
      return !!this.applications.find(applicable => applicable.key === skill.key);
    }
  }
  
}

export class TempModifier extends AbstractModifier {
    
  constructor(key: string, name: string, applications: Array<Rollable> | 'all' = 'all') {
    super(key, name, TemplateRole.TRANSIENT, applications);
  }
  
}

export class Modifier extends AbstractModifier {
  
  public static readonly MISC = new Modifier('miscModifier', 'Modifier');
  public static readonly FATIGUE = new Modifier('fatigue', 'Fatigue Penalty').derivedFrom(Attribute.STAMINA, sp => Math.max(0, -10 * sp));
  public static readonly WOUND_PASSIVE = new Modifier('woundPassive', 'Wound Passive Penalty').derivedFrom(CombatProperties.WOUNDS, list => -20 * list.length);
  public static readonly SHOCK_TEST = new TempModifier('shockTestModifier', 'Shock Test Modifier');
  
  constructor(key: string, name: string, applications: Array<Rollable> | 'all' = 'all') {
    super(key, name, TemplateRole.NO_TEMPLATE, applications);
  }
  
}