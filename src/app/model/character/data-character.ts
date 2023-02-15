import { Observable, of, throwError } from "rxjs";
import { ValueRequestDialog } from "src/app/dialog/value-request/value-request.dialog";
import { Dictionary } from "src/app/util/dictionary.util";
import { Property, TemplateRole } from "../property/abstract/property";
import { Character } from "./character";

export abstract class DataCharacter extends Character {
  
  private data: Data = {};
  
  protected constructor(name: string, data: Data = {}) {
    super(name);
    this.data = data;
  }
  
  // Get a property from character
  public get<T>(property?: Property<T>, fetchMethod?: ValueFetcher<T>): Observable<T> {
    if (property === undefined) {
      return throwError(() => new Error('Undefined property'));
    } else {
      return this.getPropertyInternal(property, fetchMethod);
    }
  }
  
  // Save a property to character's internal data
  public put<T>(property: Property<T>, value: T) {
    if (property.templateRole === TemplateRole.TRANSIENT) {
      return;
    } else if (value === undefined) {
      delete this.data[property.key];
    } else {
      this.data[property.key] = property.serialise(value);
    }
  }

  // Transform a property in internal data
  public alter<T>(property: Property<T>, transform: (currentValue: T) => T) {
    this.get(property).subscribe(currentValue => {
      this.put(property, transform(currentValue));
    });
  }
  
  // Reset a property in internal data to default value
  public reset<T>(property: Property<T>) {
    this.put(property, property.defaultValue);
  }
  
  public hasProperty<T>(property?: Property<T>): boolean {
    if (property === undefined || property.templateRole === TemplateRole.TRANSIENT) return false;
    return this.data[property.key] !== undefined;
  }
  
  // Gets a copy of internal data
  public getData(): Data {
    return {...this.data};
  }
  
  // Replace the internal data entirely - use with caution!
  public putData(newData: Data) {
    this.data = {...newData};
  }
  
  // GET Step 1: retrieves a property of the character from internal data
  private getPropertyInternal<T>(property: Property<T>, fetchMethod?: ValueFetcher<T>): Observable<T> {
    if (this.data[property.key] !== undefined) {
      try {
        let value: T = property.deserialise(this.data[property.key]);
        return of(value); // try to get value from internal data
      } catch (e) {
        return throwError(() => new Error('Bad data: \'' + this.data[property.key].toString() + '\' for property ' + property.key));
      }
    } else {
      return this.populate(property, fetchMethod); // otherwise get it from elsewhere
    }
  }
  
  // GET Step 2: If getPropertyInternal() failed to find a value internally, this determines how to go about finding a value externally
  abstract populate<T>(property: Property<T>, fetchMethod?: ValueFetcher<T>): Observable<T>;
  
  // GET Step 3: This produces the value from an external source
  protected produceValue<T>(property: Property<T>, fetchMethod: ValueFetcher<T> = FetchMethod.DEFAULT): Observable<T> {
    return fetchMethod(property, this);
  }
  
}

export type Data = Dictionary<string>;
export type ValueFetcher<T> = (property: Property<T>, character: DataCharacter) => Observable<T>;

export class FetchMethod {
  public static readonly DEFAULT: ValueFetcher<any> = (property, character) => ValueRequestDialog.requestValue(property, character);
  public static readonly REQUIRED: ValueFetcher<any> = (property, character) => ValueRequestDialog.requestValue(property, character, true);
  public static readonly SILENT: ValueFetcher<any> = () => throwError(() => new Error('No value available'));
  public static USE_VALUE(value: any): ValueFetcher<any> {
    return () => of(value);
  }
}