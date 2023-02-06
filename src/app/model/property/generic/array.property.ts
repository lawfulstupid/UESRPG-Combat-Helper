import { Property, TemplateRole } from "../abstract/property";

export class ArrayProperty<T> extends Property<Array<T>> {
  
  // Examples:
  // public static readonly NUMBER_LIST = new ArrayProperty<number>('numberList', 'Number List', TemplateRole.REFERENCE, NumericalProperty);
  // public static readonly SIZE_LIST = new ArrayProperty<SizeEnum>('sizeList', 'Size List', TemplateRole.REFERENCE, EnumProperty, {clazz: SizeEnum});
  
  serialise(value: T[]): string {
    return JSON.stringify(value.map(this.proxySerialiser));
  }
  
  deserialise(str: string): T[] {
    return JSON.parse(str).map(this.proxyDeserialiser);
  }
  
  private readonly proxySerialiser: (value: T) => string;
  private readonly proxyDeserialiser: (str: string) => T;
  
  constructor(key: string, name: string, templateRole: TemplateRole, baseProperty: any, binding?: any) {
    super(key, name, templateRole, []);
    this.proxySerialiser = baseProperty.prototype.serialise.bind(binding);
    this.proxyDeserialiser = baseProperty.prototype.deserialise.bind(binding);
  }

}