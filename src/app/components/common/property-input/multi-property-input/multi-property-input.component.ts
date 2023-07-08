import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MultiProperty } from "src/app/model/property/abstract/multi.property";
import { ValueChange } from "../property-input.component";

@Component({
  selector: 'app-multi-property-input',
  templateUrl: 'multi-property-input.component.html'
})
export class MultiPropertyInputComponent<A,B> {
  
  @Input('property')
  set setProperty(property: MultiProperty<A,B>) {
    this.property = property;
    if (property.defaultValue !== undefined) {
      this.valueStr = property.serialise(property.defaultValue);
      this.valueChange.emit({valueStr: this.valueStr, value: property.defaultValue});
    }
  }
  
  @Input()
  allowBlank: boolean = false;
  
  property!: MultiProperty<A,B>;
  
  valueStr: string = '';
  valueA?: A;
  valueB?: B;
  get value(): [A,B] | undefined {
    return MultiProperty.combine(this.valueA, this.valueB);
  }
  
  @Output()
  valueChange: EventEmitter<ValueChange<[A,B]>> = new EventEmitter();
  
  @Output()
  onEnter: EventEmitter<void> = new EventEmitter();
  
  onValueChangeA(change: ValueChange<A>) {
    if (change) {
      this.valueA = change.value;
    } else {
      this.valueA = undefined;
    }
    this.onValueChange();
  }
  
  onValueChangeB(change: ValueChange<B>) {
    if (change) {
      this.valueB = change.value;
    } else {
      this.valueB = undefined;
    }
    this.onValueChange();
  }
  
  onValueChange() {
    try {
      if (this.value !== undefined) {
        this.valueStr = this.property.serialise(this.value);
      } else if (this.allowBlank) {
        this.valueStr = '';
      } else {
        throw new Error('Value undefined');
      }
      this.valueChange.emit({valueStr: this.valueStr, value: this.value});
    } catch (e) {
      this.valueChange.emit(undefined);
    }
  }
  
}