export class Property {
  
  key: string;  // identifer for persistance
  name?: string; // display name
  templatingMode: TemplateRole;
  
  constructor(key: string, name?: string, templatingMode: TemplateRole = TemplateRole.REFERENCE) {
    this.key = key;
    this.name = name;
    this.templatingMode = templatingMode;
  }
  
}

export enum TemplateRole {
  REFERENCE,  // always use the template value (for most stats)
  MAXIMUM,    // the template is the maximum value (for stats in a range e.g. HP)
  NO_TEMPLATE // don't use the template (for temporary stats e.g. passive wound penalty)
}