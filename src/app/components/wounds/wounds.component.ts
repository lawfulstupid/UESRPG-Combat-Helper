import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Npc } from "src/app/model/character/npc";
import { HitLocationEnum } from "src/app/model/enum/hit-location.enum";
import { TemplateRole } from "src/app/model/property/abstract/property";
import { RenamedProperty } from "src/app/model/property/abstract/renamed.property";
import { Attribute } from "src/app/model/property/attribute";
import { Characteristic } from "src/app/model/property/characteristic";
import { EnumProperty } from "src/app/model/property/generic/enum.property";
import { Test } from "src/app/model/combat/test";
import { Wound } from "src/app/model/combat/wound";
import { EventManager } from "src/app/service/event.manager";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent implements OnInit {
  
  private static readonly hitLocationProperty = new EnumProperty(HitLocationEnum, 'hitLocation', 'Wound Hit Location', TemplateRole.REFERENCE);
  private static readonly shockTestProperty = new RenamedProperty(Characteristic.ENDURANCE, 'Shock Test');
  
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
      this.npc.getPropertyRequired(Characteristic.ENDURANCE).subscribe(shockTestTN => {
        this.npc.getPropertyRequired(Attribute.THREAT_RATING).subscribe(threatRating => {
          const shockTest = new Test(WoundsComponent.shockTestProperty, shockTestTN, this.npc, threatRating);
          EventManager.diceRollEvent.emit(shockTest);
          const wound = new Wound(hitLocation, hpLoss, shockTest);
          this.wounds.push(wound);
        });
      });
    });
  }
  
}