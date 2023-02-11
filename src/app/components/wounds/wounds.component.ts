import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Npc } from "src/app/model/character/npc";
import { Test } from "src/app/model/combat/test";
import { Wound } from "src/app/model/combat/wound";
import { MiscProperties } from "src/app/model/property/misc.property";
import { Modifier } from "src/app/model/property/modifier";
import { TransientProperties } from "src/app/model/property/transient.property";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent implements OnInit {
  
  @Input()
  npc!: Npc;
  
  @Input()
  woundEvent!: Subject<number>;
  
  wounds: Array<Wound> = [];
  
  ngOnInit() {
    this.woundEvent.subscribe(hpLoss => {
      this.newWound(hpLoss);
    });
  }
  
  private newWound(hpLoss: number) {
    // Get hit location from user
    ValueRequestDialog.requestValue(TransientProperties.HIT_LOCATION, this.npc, true).subscribe(hitLocation => {
      Test.make(this.npc, MiscProperties.SHOCK_TEST, {required: true}).subscribe(shockTest => {
        this.wounds.push(new Wound(hitLocation, hpLoss, shockTest));
        this.npc.writeData(Modifier.WOUND_PASSIVE, -20);
      });
    });
  }
  
}