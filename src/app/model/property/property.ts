import { Identifier } from "./identifier";

export class Property<T> extends Identifier {
  
  templatingMode: TemplateRole; // how the npc template is used
  
  constructor(key: string, name: string, templatingMode: TemplateRole = TemplateRole.REFERENCE) {
    super(key, name);
    this.templatingMode = templatingMode;
  }
  
  serialise(value: T): string {
    return JSON.stringify(value);
  }
  
  deserialise(str: string): T {
    return JSON.parse(str);
  }
  
}

export enum TemplateRole {
  REFERENCE,  // always use the template value (for most stats)
  MAXIMUM,    // the template is the maximum value (for stats in a range e.g. HP)
  NO_TEMPLATE // don't use the template (for temporary stats e.g. passive wound penalty)
}