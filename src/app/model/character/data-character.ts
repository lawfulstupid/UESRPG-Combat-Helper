import { Observable, of } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Dictionary } from "src/app/util/dictionary.util";
import { ObservableUtil } from "src/app/util/observable.util";
import { Property } from "../property/abstract/property";
import { Character } from "./character";

export abstract class DataCharacter extends Character {
  
  private data: Data = {};
  
  protected constructor(name: string, data: Data = {}) {
    super(name);
    this.data = data;
  }
  
  // save data to the internal store
  writeData<T>(property: Property<T>, value: T) {
    this.data[property.key] = property.serialise(value);
  }
  
  // replace the internal data entirely - use with caution!
  replaceData(newData: Data) {
    this.data = {...newData};
  }
  
  // gets a copy of internal data
  getRawDataCopy(): Data {
    return {...this.data};
  }
  
  getProperty<T>(property: Property<T>, valueProducer?: ValueProducer<T>): Observable<T> {
    if (this.data[property.key] !== undefined) {
      let value: T = property.deserialise(this.data[property.key]);
      return of(value); // try to get value from internal data
    } else {
      return this.populate(property, valueProducer); // otherwise get it from elsewhere
    }
  }
  
  // gets a property from some external source
  abstract populate<T>(property: Property<T>, valueProducer?: ValueProducer<T>): Observable<T>;
  
  static nullPopulator<T>(property: Property<T>): Observable<undefined> {
    return of(undefined);
  }
  
  produceValue<T>(property: Property<T>, valueProducer?: ValueProducer<T>): Observable<T> {
    let producer: () => Observable<T | undefined>;
    if (valueProducer === undefined) {
      producer = () => of(undefined);
    } else if (valueProducer instanceof Function) {
      producer = () => valueProducer(property);
    } else {
      producer = () => of(<T>valueProducer);
    }
    
    // First try to get value using valueProducer, then default back to asking user
    return ObservableUtil.coalesce(
      producer,
      () => ValueRequestDialog.requestValue(property, this)
    );
  }
  
  hasProperty<T>(property: Property<T>): boolean {
    return this.data[property.key] !== undefined;
  }
  
}

export type Data = Dictionary<string>;
export type ValueProducer<T> = T | ((property: Property<T>) => Observable<T>);