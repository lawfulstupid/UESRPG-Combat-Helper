import { Component, Input } from "@angular/core";
import { map, mergeMap, Observable } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { Property } from "src/app/model/property/abstract/property";
import { Attribute } from "src/app/model/property/attribute";

@Component({
  selector: 'app-attribute-bar',
  templateUrl: 'attribute-bar.component.html',
  styleUrls: ['attribute-bar.component.scss']
})
export class AttributeBarComponent {
  
  readonly attributeEnum = Attribute;
  
  @Input()
  npc!: Npc;
  
  @Input()
  attribute!: Attribute;
  
  statDisplay(property: Property<number>): Observable<string> {
    return this.npc.getTemplateProperty(property).pipe(mergeMap(statMax => {
      return this.npc.getProperty(property).pipe(map(stat => {
        return '' + stat + '/' + statMax;
      }));
    }));
  }
  
}