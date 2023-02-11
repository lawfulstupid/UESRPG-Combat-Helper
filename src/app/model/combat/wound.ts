import { HitLocationEnum } from "../enum/hit-location.enum";
import { Test } from "./test";

export class Wound {
  
  constructor(
    readonly location: HitLocationEnum,
    readonly severity: number,
    readonly shockTest: Test
  ) {}
  
}