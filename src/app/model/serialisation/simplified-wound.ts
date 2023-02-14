import { Wound } from "../combat/wound";
import { HitLocationEnum } from "../enum/hit-location.enum";
import { TestResultEnum } from "../enum/test-result.enum";
import { Simplified } from "./simple";

export class SimplifiedWound implements Simplified<Wound> {
  
  private readonly location: string;
  private readonly severity: number;
  private readonly shockTestResult: string;
  private readonly description?: string;
  
  constructor(wound: Wound) {
    this.location = wound.location.key();
    this.severity = wound.severity;
    this.shockTestResult = wound.shockTestResult.key();
    this.description = wound.description;
  }
  
  desimplify(): Wound {
    return new Wound(
      HitLocationEnum.value(this.location),
      this.severity,
      TestResultEnum.value(this.shockTestResult),
      this.description
    );
  }
  
}