import { AbstractType } from "@angular/core";
import { Simple, Simplifiable, Simplified } from "../../interface/simple";
import { Property, TemplateRole } from "../abstract/property";

export class ObjectProperty<T extends Simplifiable<T>> extends Property<T> {
  
  serialise(value: T): string {
    return JSON.stringify(value.simplify());
  }
  
  deserialise(str: string): T {
    return Simple.desimplify(JSON.parse(str), this.simpleClass);
  }
  
  constructor(private readonly simpleClass: AbstractType<Simplified<T>>, key: string, name: string, templateRole: TemplateRole) {
    super(key, name, templateRole);
  }
  
}