import { Observable, of, tap } from "rxjs";
import { ObservableUtil } from "src/app/util/observable.util";
import { Property, TemplateRole } from "../property/abstract/property";
import { Data, DataCharacter, ValueFetcher } from "./data-character";
import { NpcTemplate } from "./npc-template";

export class Npc extends DataCharacter {
  
  private template: NpcTemplate;
  
  constructor(name: string, template: NpcTemplate, data: Data = {}) {
    super(name, data);
    this.template = template;
  }
  
  override populate<T>(property: Property<T>, fetchMethod?: ValueFetcher<T>): Observable<T> {
    switch (property.templateRole) {
      case TemplateRole.REFERENCE:
      case TemplateRole.MAXIMUM:
        // get value from template
        return this.template.getProperty<T>(property, fetchMethod).pipe(tap(value => {
          if (property.templateRole === TemplateRole.MAXIMUM) {
            // make a copy so we can track current value independently
            this.writeData(property, value);
          }
        }));
      case TemplateRole.NO_TEMPLATE:
        // try using default value first, otherwise try user input (lazy value)
        return ObservableUtil.coalesce(
          of(property.defaultValue),
          () => this.produceValue(property, fetchMethod)
        ).pipe(tap(value => {
          this.writeData(property, value); // save the result wherever it came from
        }));
      default:
        throw new Error('Unhandled templating mode: ' + property.templateRole);
    }
  }
  
  getTemplateKey(): string {
    return this.template.key;
  }
  
  getTemplateName(): string {
    return this.template.name;
  }
  
  // gets the maximum value of a numerical property
  getTemplateProperty<T>(property?: Property<T>): Observable<T> {
    if (property?.templateRole === TemplateRole.NO_TEMPLATE) {
      return of(<T>property.defaultValue); // guaranteed to not be undefined
    } else {
      return this.template.getProperty(property);
    }
  }
  
  override hasProperty<T>(property?: Property<T>): boolean {
    if (property === undefined) {
      return false;
    } else if (super.hasProperty(property)) {
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