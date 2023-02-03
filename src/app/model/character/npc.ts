import { Observable, tap } from "rxjs";
import { ValueRequestDialog } from "../../dialog/value-request/value-request.dialog";
import { Property, TemplateRole } from "../property/abstract/property";
import { DataCharacter } from "./data-character";
import { NpcTemplate } from "./npc-template";

export class Npc extends DataCharacter {
  
  private template: NpcTemplate;
  
  constructor(name: string, template: NpcTemplate) {
    super(name);
    this.template = template;
  }
  
  protected override populate<T>(property: Property<T>): Observable<T> {
    switch (property.templateRole) {
      case TemplateRole.REFERENCE:
      case TemplateRole.MAXIMUM:
        // get value from template
        return this.template.getProperty<T>(property).pipe(tap(value => {
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
  
  getTemplateName(): string {
    return this.template.name;
  }
  
  // gets the maximum value of a numerical property
  getTemplateProperty(stat: Property<number>): Observable<number> {
    return this.template.getProperty(stat);
  }
  
  override hasProperty<T>(property: Property<T>): boolean {
    if (super.hasProperty(property)) {
      return true;
    } else switch (property.templateRole) {
      case TemplateRole.REFERENCE:
      case TemplateRole.MAXIMUM:
        return this.template.hasProperty(property);
      default:
        return false;
    }
  }
  
}