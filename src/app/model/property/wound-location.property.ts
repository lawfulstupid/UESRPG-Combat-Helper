import { RandomUtil } from "src/app/util/random.util";
import { WoundStatusEnum } from "../enum/wound-status.enum";
import { TemplateRole } from "./abstract/property";
import { EnumProperty } from "./types/enum.property";

export class WoundLocationProperty extends EnumProperty<WoundStatusEnum> {
  
  override DOMAIN = 'wound';
  
  // Main body parts
  public static readonly HEAD = new WoundLocationProperty('head', 'Head');
  public static readonly BODY = new WoundLocationProperty('body', 'Body');
  public static readonly ARM_R = new WoundLocationProperty('arm.right', 'Right Arm');
  public static readonly ARM_L = new WoundLocationProperty('arm.left', 'Left Arm');
  public static readonly LEG_R = new WoundLocationProperty('leg.right', 'Right Leg');
  public static readonly LEG_L = new WoundLocationProperty('leg.left', 'Left Leg');
  
  // Parts of head
  public static readonly EYE_R = new WoundLocationProperty('head.eye.right', 'Right Eye');
  public static readonly EYE_L = new WoundLocationProperty('head.eye.left', 'Left Eye');
  public static readonly EAR_R = new WoundLocationProperty('head.ear.right', 'Right Ear');
  public static readonly EAR_L = new WoundLocationProperty('head.ear.left', 'Left Ear');
  
  constructor(key: string, name: string) {
    super(WoundStatusEnum, key, name, TemplateRole.NO_TEMPLATE, WoundStatusEnum.OK);
  }
  
  static randomHeadPart(): WoundLocationProperty {
    return RandomUtil.fromList([this.EYE_R, this.EYE_L, this.EAR_R, this.EAR_L]);
  }
  
}