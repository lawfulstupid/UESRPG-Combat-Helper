import { Observable } from "rxjs";
import { DataCharacter, FetchMethod } from "../../character/data-character";
import { NumericalProperty } from "../generic/number.property";

export abstract class Rollable extends NumericalProperty {
  
  getTargetNumber(npc: DataCharacter, required: boolean = false): Observable<number> {
    if (required) {
      return npc.getProperty(this, FetchMethod.REQUIRED);
    } else {
      return npc.getProperty(this);
    }
  }
  
}