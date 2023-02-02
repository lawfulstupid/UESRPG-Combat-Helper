import { Identifier } from "../identifier";

export abstract class Property<T> extends Identifier {
  
  readonly templateRole: TemplateRole; // how the npc template is used
  
  protected constructor(key: string, name: string, templateRole: TemplateRole) {
    super(key, name);
    this.templateRole = templateRole;
  }
  
  abstract serialise(value: T): string;
  abstract deserialise(str: string): T;
  
}

export enum TemplateRole {
  REFERENCE,  // always use the template value (for most stats)
  MAXIMUM,    // the template is the maximum value (for stats in a range e.g. HP)
  NO_TEMPLATE // don't use the template (for temporary stats e.g. passive wound penalty)
}