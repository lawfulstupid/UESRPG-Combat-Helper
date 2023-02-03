import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Property } from "src/app/model/property/abstract/property";

@Component({
  selector: 'app-property-input',
  templateUrl: 'property-input.component.html'
})
export class PropertyInputComponent<T> {
  
  @Input()
  property!: Property<T>;
  
  errorMessage?: string;
  showErrorMessage: boolean = false;
  
  @Output()
  valueChange: EventEmitter<ValueChange<T>> = new EventEmitter();
  
  @Output()
  onEnter: EventEmitter<void> = new EventEmitter();
  
  onValueChange(valueStr: string) {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      let value: T = this.property.deserialise(valueStr);
      this.valueChange.emit({valueStr: valueStr, value: value});
    } catch (e) {
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