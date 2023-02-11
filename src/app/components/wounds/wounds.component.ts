import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Npc } from "src/app/model/character/npc";
import { Test } from "src/app/model/combat/test";
import { Wound } from "src/app/model/combat/wound";
import { HitLocationEnum } from "src/app/model/enum/hit-location.enum";
import { TemplateRole } from "src/app/model/property/abstract/property";
import { Characteristic } from "src/app/model/property/characteristic";
import { EnumProperty } from "src/app/model/property/generic/enum.property";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent implements OnInit {
  
  private static readonly hitLocationProperty = new EnumProperty(HitLocationEnum, 'hitLocation', 'Wound Hit Location', TemplateRole.REFERENCE);
  private static readonly shockTestProperty = Characteristic.ENDURANCE.renamed('Shock Test');
  
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
    ValueRequestDialog.requestValue(WoundsComponent.hitLocationProperty, this.npc, true).subscribe(hitLocation => {
      // Get Endurance for Shock Test
      WoundsComponent.shockTestProperty.getTargetNumber(this.npc).subscribe(shockTestTN => {
        Test.make(WoundsComponent.shockTestProperty, shockTestTN, this.npc).subscribe(shockTest => {
          this.wounds.push(new Wound(hitLocation, hpLoss, shockTest));
        });
      });
    });
  }
  
}