import { Property } from "../property/property";

export class SkillEnum {

  public static readonly COMBAT = new Property<number>('combat', 'Combat');
  public static readonly KNOWLEDGE = new Property<number>('knowledge', 'Knowledge');
  public static readonly MAGIC = new Property<number>('magic', 'Magic');
  public static readonly OBSERVE = new Property<number>('observe', 'Observe');
  public static readonly PHYSICAL = new Property<number>('physical', 'Physical');
  public static readonly SOCIAL = new Property<number>('social', 'Social');
  public static readonly STEALTH = new Property<number>('stealth', 'Stealth');
  public static readonly EVADE = new Property<number>('evade', 'Evade');

}