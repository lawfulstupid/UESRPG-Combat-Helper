import { Property, TemplateRole } from "./property";

export class MultiProperty<A,B> extends Property<[A,B]> {
  
  constructor(readonly propA: Property<A>, readonly propB: Property<B>) {
    super('', propA.name + ' and ' +  propB.name, TemplateRole.TRANSIENT, MultiProperty.combine(propA.defaultValue, propB.defaultValue));
  }
  
  public static combine<A,B>(valueA: A | undefined, valueB: B | undefined): [A,B] | undefined {
    if (valueA !== undefined && valueB !== undefined) {
      return [valueA, valueB];
    } else {
      return undefined;
    }
  }
  
  override get key(): string {
    throw new Error('Multi-properties have no key');
  }
  
  serialise(value: [A,B]): string {
    const strA = this.propA.serialise(value[0]);
    const strB = this.propB.serialise(value[1]);
    return JSON.stringify([strA,strB]);
  }
  
  deserialise(str: string): [A,B] {
    const [strA,strB] = JSON.parse(str);
    return [this.propA.deserialise(strA), this.propB.deserialise(strB)];
  }
  
}