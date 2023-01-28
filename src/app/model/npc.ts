import { tap, mergeMap, Observable, of } from "rxjs";
import { DataCharacter } from "./data-character";
import { Property, TemplateRole } from "./lookup/property";
import { NpcTemplate } from "./npc-template";
import { ValueRequestDialog } from "../dialog/value-request/value-request.dialog";

export class Npc extends DataCharacter {
  
  template: NpcTemplate;
  
  constructor(name: string, template: NpcTemplate) {
    super(name, {});
    this.template = template;
  }
  
  protected override populate<T>(property: Property, castFn: (json: string) => T): Observable<T> {
    switch (property.templatingMode) {
      case TemplateRole.REFERENCE | TemplateRole.MAXIMUM:
        // get value from template
        return this.template.getObject<T>(property, castFn).pipe(tap(value => {
          if (property.templatingMode === TemplateRole.MAXIMUM) {
            // make a copy so we can track current value independently
            this.writeData(property, value);
          }
        }));
      case TemplateRole.NO_TEMPLATE:
        // get value from user input
        return ValueRequestDialog.requestValue<T>(this, property, castFn).pipe(tap(value => {
          this.writeData(property, value); // and save
        }));
      default:
        throw new Error('Unhandled templating mode: ' + property.templatingMode);
    }
  }
  
}