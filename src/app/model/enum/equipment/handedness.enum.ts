import { RegisterPersistable } from "src/app/persistence/persistable";
import { Enum } from "../enum";

@RegisterPersistable('1c3ed7c0-508d-4c21-90ae-b653dc03bd44')
export class HandednessEnum extends Enum<HandednessEnum> {
  
  public static readonly ONE_HANDED = new HandednessEnum("1H");
  public static readonly VERSATILE = new HandednessEnum("1.5H");
  public static readonly TWO_HANDED = new HandednessEnum("2H");
  
}