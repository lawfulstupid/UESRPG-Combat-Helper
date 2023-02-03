import { Component, Input } from "@angular/core";
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { map, mergeMap, Observable } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { Attribute } from "src/app/model/property/attribute";

@Component({
  selector: 'app-attribute-bar',
  templateUrl: 'attribute-bar.component.html',
  styleUrls: ['attribute-bar.component.scss']
})
export class AttributeBarComponent {
  
  readonly faCircleMinus = faCircleMinus;
  readonly faCirclePlus = faCirclePlus;
  
  readonly attributeEnum = Attribute;
  
  @Input()
  npc!: Npc;
  
  @Input()
  attribute!: Attribute;
  
  @Input()
  color: string = 'white';
  
  statDisplay(): Observable<string> {
    return this.npc.getTemplateProperty(this.attribute).pipe(mergeMap(statMax => {
      return this.npc.getProperty(this.attribute).pipe(map(stat => {
        return '' + stat + '/' + statMax;
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
  
}