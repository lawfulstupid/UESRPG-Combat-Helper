import { Observable } from "rxjs";
import { DataCharacter, ValueProducer } from "../../character/data-character";
import { NumericalProperty } from "../generic/number.property";

export abstract class Rollable extends NumericalProperty {
  
  getTargetNumber(npc: DataCharacter, fetchMethod: ValueProducer<number>): Observable<number> {
    return npc.getProperty(this, fetchMethod);
  }
  
}