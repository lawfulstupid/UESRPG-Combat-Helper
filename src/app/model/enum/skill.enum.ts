import { Identifier } from "../identifier/identifier";

export class SkillEnum {

  public static readonly COMBAT = new Identifier('combat', 'Combat');
  public static readonly KNOWLEDGE = new Identifier('knowledge', 'Knowledge');
  public static readonly MAGIC = new Identifier('magic', 'Magic');
  public static readonly OBSERVE = new Identifier('observe', 'Observe');
  public static readonly PHYSICAL = new Identifier('physical', 'Physical');
  public static readonly SOCIAL = new Identifier('social', 'Social');
  public static readonly STEALTH = new Identifier('stealth', 'Stealth');
  public static readonly EVADE = new Identifier('evade', 'Evade');

}