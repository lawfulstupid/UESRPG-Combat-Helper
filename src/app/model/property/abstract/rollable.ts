import { Observable } from "rxjs";
import { DataCharacter } from "../../character/data-character";
import { NumericalProperty } from "../generic/number.property";

export abstract class Rollable extends NumericalProperty {
  
  getTargetNumber(npc: DataCharacter, required: boolean = false): Observable<number> {
    console.log('Target Number Required', required);
    if (required) {
      return npc.getPropertyRequired(this);
    } else {
      return npc.getProperty(this);
    }
  }
  
}