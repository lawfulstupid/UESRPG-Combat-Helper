import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Property } from "src/app/model/property/abstract/property";

@Component({
  selector: 'app-property-input',
  templateUrl: 'property-input.component.html'
})
export class PropertyInputComponent<T> {
  
  @Input()
  property!: Property<T>;
  
  value?: T;
  errorMessage?: string;
  showErrorMessage: boolean = false;
  
  @Output()
  valueChange: EventEmitter<T> = new EventEmitter();
  
  @Output()
  onEnter: EventEmitter<void> = new EventEmitter();
  
  onValueChange(value: string) {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      this.value = this.property.deserialise(value);
    } catch (e) {
      this.value = undefined;
      this.errorMessage = 'Invalid'; // TODO: more detail
    }
    this.valueChange.emit(this.value);
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