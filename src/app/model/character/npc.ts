import { Observable, tap } from "rxjs";
import { ValueRequestDialog } from "../../dialog/value-request/value-request.dialog";
import { Property, TemplateRole } from "../property/property";
import { DataCharacter } from "./data-character";
import { NpcTemplate } from "./npc-template";

export class Npc extends DataCharacter {
  
  template: NpcTemplate;
  
  constructor(name: string, template: NpcTemplate) {
    super(name, {});
    this.template = template;
  }
  
  protected override populate<T>(property: Property<T>): Observable<T> {
    switch (property.templateRole) {
      case TemplateRole.REFERENCE | TemplateRole.MAXIMUM:
        // get value from template
        return this.template.getObject<T>(property).pipe(tap(value => {
          if (property.templateRole === TemplateRole.MAXIMUM) {
            // make a copy so we can track current value independently
            this.writeData(property, value);
          }
        }));
      case TemplateRole.NO_TEMPLATE:
        // get value from user input
        return ValueRequestDialog.requestValue<T>(this, property).pipe(tap(value => {
          this.writeData(property, value); // and save
        }));
      default:
        throw new Error('Unhandled templating mode: ' + property.templateRole);
    }
  }
  
  // gets the maximum value of a numerical property
  getStatMax(stat: Property<number>): Observable<number> {
    return this.template.getStat(stat);
  }
  
}