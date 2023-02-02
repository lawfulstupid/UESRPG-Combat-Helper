import { NumericalProperty } from "../property/numerical-property";

export class SkillEnum {

  public static readonly COMBAT = new NumericalProperty('combat', 'Combat');
  public static readonly KNOWLEDGE = new NumericalProperty('knowledge', 'Knowledge');
  public static readonly MAGIC = new NumericalProperty('magic', 'Magic');
  public static readonly OBSERVE = new NumericalProperty('observe', 'Observe');
  public static readonly PHYSICAL = new NumericalProperty('physical', 'Physical');
  public static readonly SOCIAL = new NumericalProperty('social', 'Social');
  public static readonly STEALTH = new NumericalProperty('stealth', 'Stealth');
  public static readonly EVADE = new NumericalProperty('evade', 'Evade');

}