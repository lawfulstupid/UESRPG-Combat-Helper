import { Observable, of, tap } from "rxjs";
import { ObservableUtil } from "src/app/util/observable.util";
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
  
  override populate<T>(property: Property<T>, useValue?: T): Observable<T> {
    switch (property.templateRole) {
      case TemplateRole.REFERENCE:
      case TemplateRole.MAXIMUM:
        // get value from template
        return this.template.getProperty<T>(property, useValue).pipe(tap(value => {
          if (property.templateRole === TemplateRole.MAXIMUM) {
            // make a copy so we can track current value independently
            this.writeData(property, value);
          }
        }));
      case TemplateRole.NO_TEMPLATE:
        // try using default value first, otherwise try user input (lazy value)
        return ObservableUtil.coalesce(
          of(useValue),
          of(property.defaultValue),
          () => ValueRequestDialog.requestValue<T>(property, this) // lazy value
        ).pipe(tap(value => {
          this.writeData(property, value); // save the result wherever it came from
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
      case TemplateRole.NO_TEMPLATE:
        return property.defaultValue !== undefined;
      default:
        throw new Error('Unhandled templating mode: ' + property.templateRole);
    }
  }
  
}