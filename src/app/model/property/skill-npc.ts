import { Characteristic } from "./characteristic";
import { GenericSkill } from "./skill-generic";

export class NpcSkill extends GenericSkill {
  
  public static readonly COMBAT     = new NpcSkill('combat',    'Combat',     [Characteristic.STRENGTH, Characteristic.AGILITY]);
  public static readonly KNOWLEDGE  = new NpcSkill('knowledge', 'Knowledge',  [Characteristic.INTELLIGENCE]);
  public static readonly MAGIC      = new NpcSkill('magic',     'Magic',      [Characteristic.WILLPOWER]);
  public static readonly OBSERVE    = new NpcSkill('observe',   'Observe',    [Characteristic.PERCEPTION]);
  public static readonly PHYSICAL   = new NpcSkill('physical',  'Physical',   [Characteristic.STRENGTH, Characteristic.ENDURANCE]);
  public static readonly SOCIAL     = new NpcSkill('social',    'Social',     [Characteristic.PERSONALITY]);
  public static readonly STEALTH    = new NpcSkill('stealth',   'Stealth',    [Characteristic.AGILITY]);
  public static readonly EVADE      = new NpcSkill('evade',     'Evade',      [Characteristic.AGILITY]);
  
}