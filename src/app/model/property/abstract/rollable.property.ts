import { Observable } from "rxjs";
import { DataCharacter, ValueFetcher } from "../../character/data-character";
import { NumericalProperty } from "../types/number.property";

export abstract class Rollable extends NumericalProperty {
  
  getTargetNumber(npc: DataCharacter, fetchMethod: ValueFetcher<number>): Observable<number> {
    return npc.getProperty(this, fetchMethod);
  }
  
}