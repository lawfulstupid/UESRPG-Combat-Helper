import { TemplateRole } from "./property";
import { NumericalProperty } from "./property-number";

export class SkillGroup extends NumericalProperty {
  
  public static readonly COMBAT = new SkillGroup('combat', 'Combat');
  public static readonly KNOWLEDGE = new SkillGroup('knowledge', 'Knowledge');
  public static readonly MAGIC = new SkillGroup('magic', 'Magic');
  public static readonly OBSERVE = new SkillGroup('observe', 'Observe');
  public static readonly PHYSICAL = new SkillGroup('physical', 'Physical');
  public static readonly SOCIAL = new SkillGroup('social', 'Social');
  public static readonly STEALTH = new SkillGroup('stealth', 'Stealth');
  public static readonly EVADE = new SkillGroup('evade', 'Evade');
  
  protected constructor(key: string, name: string) {
    super(key, name, TemplateRole.REFERENCE);
  }
  
}