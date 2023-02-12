import { AbstractType } from "@angular/core";
import { Simplifiable, Simplified } from "../../interface/simple";
import { Property, TemplateRole } from "../abstract/property";

export class ObjectProperty<T extends Simplifiable<T>> extends Property<T> {
  
  serialise(value: T): string {
    return JSON.stringify(value.simplify());
  }
  
  deserialise(str: string): T {
    const simpleObj = Object.setPrototypeOf(JSON.parse(str), this.simpleClass.prototype);
    return simpleObj.desimplify();
  }
  
  constructor(private readonly simpleClass: AbstractType<Simplified<T>>, key: string, name: string, templateRole: TemplateRole) {
    super(key, name, templateRole);
  }
  
}