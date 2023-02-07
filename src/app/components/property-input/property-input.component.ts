import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { DataCharacter } from "src/app/model/character/data-character";
import { Property, TemplateRole } from "src/app/model/property/abstract/property";

@Component({
  selector: 'app-property-input',
  templateUrl: 'property-input.component.html'
})
export class PropertyInputComponent<T> implements OnInit {
  
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
  
  @Input()
  allowBlank: boolean = false;
  
  @Input()
  directCharacterAccess?: DataCharacter;
  
  property!: Property<T>;
  usingOptions: boolean = false;
  
  valueStr: string = '';
  value?: T;
  
  errorMessage?: string;
  showErrorMessage: boolean = false;
  
  @Output()
  valueChange: EventEmitter<ValueChange<T>> = new EventEmitter();
  
  @Output()
  onEnter: EventEmitter<void> = new EventEmitter();
  
  ngOnInit() {
    if (this.directCharacterAccess) {
      if (this.property.templateRole !== TemplateRole.NO_TEMPLATE) {
        this.directCharacterAccess = undefined;
        throw new Error('Cannot directly access templated properties');
      }
      this.directCharacterAccess.getPropertySilent(this.property).pipe(catchError(() => EMPTY)).subscribe(value => {
        this.value = value;
        this.valueStr = this.property.serialise(value);
        this.outputValue(true);
      });
    }
  }
  
  onValueChange() {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      if (this.allowBlank && this.valueStr.trim() === '') {
        this.value = undefined;
      } else {
        this.value = this.property.deserialise(this.valueStr);
      }
      this.outputValue();
    } catch (e) {
      this.errorMessage = 'Invalid'; // TODO: more detail
      this.valueChange.emit(undefined);
    }
  }
  
  outputValue(init: boolean = false) {
    this.valueChange.emit({valueStr: this.valueStr, value: this.value});
    if (this.directCharacterAccess && !init) {
      this.directCharacterAccess.writeData(this.property, this.value);
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
  value: T | undefined
}