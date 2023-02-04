import { Component, Input } from "@angular/core";
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { map, mergeMap, Observable, of } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Npc } from "src/app/model/character/npc";
import { Attribute } from "src/app/model/property/attribute";
import { ObservableUtil } from "src/app/util/observable.util";

@Component({
  selector: 'app-attribute-bar',
  templateUrl: 'attribute-bar.component.html',
  styleUrls: ['attribute-bar.component.scss']
})
export class AttributeBarComponent {
  
  readonly faCircleMinus = faCircleMinus;
  readonly faCirclePlus = faCirclePlus;
  
  @Input()
  npc!: Npc;
  
  @Input()
  attribute!: Attribute;
  
  @Input()
  color: string = 'white';
  
  @Input()
  disabled?: boolean | null = false;
  
  statDisplay(): Observable<string> {
    return this.npc.getTemplateProperty(this.attribute).pipe(mergeMap(statMax => {
      return this.npc.getProperty(this.attribute).pipe(map(stat => {
        return '' + stat + ' / ' + statMax;
      }));
    }));
  }
  
  getBarPercent(): Observable<string> {
    return this.npc.getTemplateProperty(this.attribute).pipe(mergeMap(statMax => {
      return this.npc.getProperty(this.attribute).pipe(map(stat => {
        let ratio = 100 * stat / statMax;
        return ratio.toFixed(0) + '%';
      }));
    }));
  }
  
  modify(direction: number, value?: number) {
    ObservableUtil.coalesce(
      of(value),                                                  // If value is provided, use it as-is
      () => ValueRequestDialog.requestValueChange(this.attribute) // Otherwise, get value from user (lazy value)
    ).subscribe(value => {
      this.npc.getProperty(this.attribute).subscribe(currentValue => {        // Get current value from NPC
        this.npc.writeData(this.attribute, currentValue + direction * value); // Modify it appropriately
      });
    });
  }
  
}