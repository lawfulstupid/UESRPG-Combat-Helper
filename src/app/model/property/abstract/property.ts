import { identity } from "rxjs";
import { Identifier } from "../../identifier";

export abstract class Property<T> extends Identifier {
  
  readonly DOMAIN?: string;
  
  override get key(): string {
    return (this.DOMAIN ? this.DOMAIN + '.' : '') + super.key;
  }
  
  constructor(key: string, name: string, readonly templateRole: TemplateRole, readonly defaultValue?: T) {
    super(key, name);
  }
  
  abstract serialise(value: T): string;
  abstract deserialise(str: string): T;
  
  // Derivation stuff below
  
  private derivation?: PropertyDerivation<any,T>;
  
  isDerived(): boolean {
    return this.derivation !== undefined;
  }
  
  getBaseProperty(): Property<any> {
    return this.derivation!.baseProperty;
  }
  
  derivationTransform(value: any): T {
    return this.derivation!.transform(value);
  }
  
  // Creates a derived property with the current class
  derivedFrom<S>(baseProperty: Property<S>, transform: (value: S) => T): this {
    const clone: typeof this = Object.create(this);
    clone.derivation = new PropertyDerivation(baseProperty, transform);
    return clone;
  }
  
  override renamed(alias: string): this {
    return super.renamed(alias).derivedFrom(this, identity);
  }
  
}

// How the npc template is used
export enum TemplateRole {
  REFERENCE,    // always use the template value (for most stats)
  MAXIMUM,      // the template is the maximum value (for stats in a range e.g. HP)
  NO_TEMPLATE,  // don't use the template (for temporary stats e.g. passive wound penalty)
  TRANSIENT     // should not be saved
}

class PropertyDerivation<S,T> {
  constructor(
    readonly baseProperty: Property<S>,
    readonly transform: (input: S) => T
  ) {}
}