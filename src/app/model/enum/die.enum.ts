import { RegisterPersistable } from "src/app/persistence/persistable";
import { RandomUtil } from "src/app/util/random.util";
import { Enum } from "./enum";

@RegisterPersistable('8f89a3e6-3642-4904-aac5-339233d81af5')
export class DieEnum extends Enum<DieEnum> {
  
  public static readonly D2 = new DieEnum('1d2', 2);
  public static readonly D4 = new DieEnum('1d4', 4);
  public static readonly D6 = new DieEnum('1d6', 6);
  public static readonly D8 = new DieEnum('1d8', 8);
  public static readonly D10 = new DieEnum('1d10', 10);
  public static readonly D12 = new DieEnum('1d12', 12);
  
  constructor(name: string, private size: number) {
    super(name);
  }
  
  roll(): number {
    return RandomUtil.d(this.size);
  }
  
  stepUp(): DieEnum {
    const key = this.key();
    const idx = DieEnum.keys().indexOf(key);
    return <DieEnum> DieEnum.values()[idx+1];
  }
  
}