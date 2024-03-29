import { Observable } from "rxjs";
import { ObservableUtil } from "src/app/util/observable.util";
import { DataCharacter, FetchMethod, ValueFetcher } from "../character/data-character";
import { GenericSkill } from "./abstract/skill-generic.property";
import { Characteristic } from "./characteristic.property";
import { NpcSkill } from "./skill-npc.property";

export class Skill extends GenericSkill {
  
  override DOMAIN = 'skill';
  
  public static readonly ACROBATICS   = new Skill('acrobatics',   'Acrobatics',   NpcSkill.PHYSICAL,  [Characteristic.STRENGTH, Characteristic.AGILITY]);
  public static readonly ALCHEMY      = new Skill('alchemy',      'Alchemy',      NpcSkill.KNOWLEDGE, [Characteristic.INTELLIGENCE]);
  public static readonly ALTERATION   = new Skill('alteration',   'Alteration',   NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly ATHLETICS    = new Skill('athletics',    'Athletics',    NpcSkill.PHYSICAL,  [Characteristic.STRENGTH, Characteristic.ENDURANCE]);
  public static readonly COMBAT_STYLE = new Skill('combatStyle',  'Combat Style', NpcSkill.COMBAT,    [Characteristic.STRENGTH, Characteristic.AGILITY]);
  public static readonly COMMAND      = new Skill('command',      'Command',      NpcSkill.SOCIAL,    [Characteristic.STRENGTH, Characteristic.INTELLIGENCE, Characteristic.PERSONALITY]);
  public static readonly COMMERCE     = new Skill('commerce',     'Commerce',     NpcSkill.SOCIAL,    [Characteristic.INTELLIGENCE, Characteristic.PERSONALITY]);
  public static readonly CONJURATION  = new Skill('conjuration',  'Conjuration',  NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly DECEIVE      = new Skill('deceive',      'Deceive',      NpcSkill.SOCIAL,    [Characteristic.INTELLIGENCE, Characteristic.PERSONALITY]);
  public static readonly DESTRUCTION  = new Skill('destruction',  'Destruction',  NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly ENCHANT      = new Skill('enchant',      'Enchant',      NpcSkill.MAGIC,     [Characteristic.INTELLIGENCE]);
  public static readonly EVADE        = new Skill('evade',        'Evade',        NpcSkill.EVADE,     [Characteristic.AGILITY]);
  public static readonly ILLUSION     = new Skill('illusion',     'Illusion',     NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly INVESTIGATE  = new Skill('investigate',  'Investigate',  NpcSkill.OBSERVE,   [Characteristic.INTELLIGENCE, Characteristic.PERCEPTION]);
  public static readonly LOGIC        = new Skill('logic',        'Logic',        NpcSkill.KNOWLEDGE, [Characteristic.INTELLIGENCE, Characteristic.PERCEPTION]);
  public static readonly LORE         = new Skill('lore',         'Lore',         NpcSkill.KNOWLEDGE, [Characteristic.INTELLIGENCE]);
  public static readonly MYSTICISM    = new Skill('mysticism',    'Mysticism',    NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly NAVIGATE     = new Skill('navigate',     'Navigate',     NpcSkill.OBSERVE,   [Characteristic.INTELLIGENCE, Characteristic.PERCEPTION]);
  public static readonly OBSERVE      = new Skill('observe',      'Observe',      NpcSkill.OBSERVE,   [Characteristic.PERCEPTION]);
  public static readonly PERSUADE     = new Skill('persuade',     'Persuade',     NpcSkill.SOCIAL,    [Characteristic.STRENGTH, Characteristic.PERSONALITY]);
  // I don't know how to deal with Profession yet, probably won't have to.
  public static readonly RESTORATION  = new Skill('restoration',  'Restoration',  NpcSkill.MAGIC,     [Characteristic.WILLPOWER]);
  public static readonly RIDE         = new Skill('ride',         'Ride',         NpcSkill.PHYSICAL,  [Characteristic.AGILITY]);
  public static readonly STEALTH      = new Skill('stealth',      'Stealth',      NpcSkill.STEALTH,   [Characteristic.AGILITY, Characteristic.PERCEPTION]);
  public static readonly SUBTERFUGE   = new Skill('subterfuge',   'Subterfuge',   NpcSkill.STEALTH,   [Characteristic.AGILITY, Characteristic.INTELLIGENCE]);
  public static readonly SURVIVAL     = new Skill('survival',     'Survival',     NpcSkill.OBSERVE,   [Characteristic.INTELLIGENCE, Characteristic.PERCEPTION]);
  
  protected constructor(key: string, name: string, readonly npcSkill: NpcSkill, governedBy: Array<Characteristic>) {
    super(key, name, governedBy);
  }
  
  override getTargetNumber(npc: DataCharacter, fetchMethod: ValueFetcher<number>): Observable<number> {
    // Tries a few strategies to get the TN:
    return ObservableUtil.coalesce(
      () => npc.get(this, FetchMethod.ERROR),                // 1. Check for PC skill without asking user
      () => this.npcSkill.getTargetNumber(npc, fetchMethod), // 2. Check for NPC skill, ask user if missing
      () => super.getTargetNumber(npc, fetchMethod)          // 3. Default method. This fires if user clicks 'Cancel' on NPC skill value request dialog
    );
  }
  
}