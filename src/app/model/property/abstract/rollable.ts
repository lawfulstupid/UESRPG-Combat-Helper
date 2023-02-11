import { Observable } from "rxjs";
import { DataCharacter } from "../../character/data-character";
import { NumericalProperty } from "../generic/number.property";

export abstract class Rollable extends NumericalProperty {
  
  getTargetNumber(npc: DataCharacter): Observable<number> {
    return npc.getProperty(this);
  }
  
}