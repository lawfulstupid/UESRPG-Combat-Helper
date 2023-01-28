import { Property } from "../property";

export class SkillEnum {

  public static readonly COMBAT = new Property('combat', 'Combat');
  public static readonly KNOWLEDGE = new Property('knowledge', 'Knowledge');
  public static readonly MAGIC = new Property('magic', 'Magic');
  public static readonly OBSERVE = new Property('observe', 'Observe');
  public static readonly PHYSICAL = new Property('physical', 'Physical');
  public static readonly SOCIAL = new Property('social', 'Social');
  public static readonly STEALTH = new Property('stealth', 'Stealth');
  public static readonly EVADE = new Property('evade', 'Evade');

}