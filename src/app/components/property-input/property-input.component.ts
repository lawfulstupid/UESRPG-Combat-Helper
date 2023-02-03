import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Property } from "src/app/model/property/abstract/property";

@Component({
  selector: 'app-property-input',
  templateUrl: 'property-input.component.html'
})
export class PropertyInputComponent<T> {
  
  @Input('property')
  set setProperty(property: Property<T>) {
    this.property = property;
    if (property.defaultValue !== undefined) {
      this.valueStr = property.serialise(property.defaultValue);
      this.valueChange.emit({valueStr: this.valueStr, value: property.defaultValue});
    }
    if (property.options !== undefined) {
      this.usingOptions = true;
    }
  }
  
  property!: Property<T>;
  usingOptions: boolean = false;
  valueStr: string = '';
  errorMessage?: string;
  showErrorMessage: boolean = false;
  
  @Output()
  valueChange: EventEmitter<ValueChange<T>> = new EventEmitter();
  
  @Output()
  onEnter: EventEmitter<void> = new EventEmitter();
  
  onValueChange() {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      let value: T = this.property.deserialise(this.valueStr);
      this.valueChange.emit({valueStr: this.valueStr, value: value});
    } catch (e) {
      console.log(e);
      this.errorMessage = 'Invalid'; // TODO: more detail
      this.valueChange.emit(undefined);
    }
  }
  
  onFocusChange() {
    this.showErrorMessage = !!this.errorMessage;
  }
  
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnter.emit();
    }
  }
  
}

export interface ValueChange<T> {
  valueStr: string;
  value: T
}