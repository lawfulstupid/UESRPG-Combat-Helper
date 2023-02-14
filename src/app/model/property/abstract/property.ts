import { Identifier } from "../../identifier";

export abstract class Property<T> extends Identifier {
  
  constructor(key: string, name: string, readonly templateRole: TemplateRole, readonly defaultValue?: T) {
    super(key, name);
  }
  
  abstract serialise(value: T): string;
  abstract deserialise(str: string): T;
  
}

// How the npc template is used
export enum TemplateRole {
  REFERENCE,    // always use the template value (for most stats)
  MAXIMUM,      // the template is the maximum value (for stats in a range e.g. HP)
  NO_TEMPLATE,  // don't use the template (for temporary stats e.g. passive wound penalty)
  TRANSIENT     // should not be saved
}