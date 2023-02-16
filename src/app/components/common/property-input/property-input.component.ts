import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { DataCharacter, FetchMethod } from "src/app/model/character/data-character";
import { Property, TemplateRole } from "src/app/model/property/abstract/property";
import { ArrayProperty } from "src/app/model/property/types/array.property";
import { BooleanProperty } from "src/app/model/property/types/boolean.property";
import { EnumProperty } from "src/app/model/property/types/enum.property";
import { TextAreaProperty } from "src/app/model/property/types/text-area.property";

@Component({
  selector: 'app-property-input',
  templateUrl: 'property-input.component.html',
  styleUrls: ['property-input.component.scss']
})
export class PropertyInputComponent<T> implements OnInit {
  
  @Input('property')
  set setProperty(property: Property<T>) {
    this.property = property;
    if (property.defaultValue !== undefined) {
      this.valueStr = property.serialise(property.defaultValue);
      this.valueChange.emit({valueStr: this.valueStr, value: property.defaultValue});
    }
    
    if (property instanceof ArrayProperty) {
      this.arrayProperty = property;
    } else if (property instanceof BooleanProperty) {
      this.booleanProperty = property;
      this.value = <T><any>false;
      this.onValueChange();
    } else if (property instanceof EnumProperty) {
      this.enumProperty = property;
    } else if (property instanceof TextAreaProperty) {
      this.textAreaProperty = property;
    } else {
      this.defaultProperty = property; // for (single-line) text and numbers
    }
  }
  
  @Input()
  allowBlank: boolean = false;
  
  @Input()
  directCharacterAccess?: DataCharacter;
  
  private property!: Property<T>;
  // Only one of the below will be populated -- determines how property input is displayed
  defaultProperty?: Property<T>;
  arrayProperty?: ArrayProperty<any>; // TODO #4
  booleanProperty?: BooleanProperty;
  enumProperty?: EnumProperty<any>;
  textAreaProperty?: TextAreaProperty;
  
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
      this.directCharacterAccess.get(this.property, FetchMethod.SILENT)
        .pipe(catchError(() => EMPTY))
        .subscribe(value => {
          this.value = value;
          this.valueStr = this.property.serialise(value);
          this.output(true);
        });
    }
  }
  
  // Call if [ngModel]="value"
  onValueChange() {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      if (this.value !== undefined) {
        this.valueStr = this.property.serialise(this.value);
      } else if (this.allowBlank) {
        this.valueStr = '';
      } else {
        throw new Error('Value undefined');
      }
      this.output();
    } catch (e) {
      this.errorMessage = 'Invalid'; // TODO: more detail
      this.valueChange.emit(undefined);
    }
  }
  
  // Call if [ngModel]="valueStr"
  onValueStrChange() {
    this.showErrorMessage = false;
    this.errorMessage = undefined;
    try {
      if (this.allowBlank && this.valueStr.trim() === '') {
        this.value = undefined;
      } else {
        this.value = this.property.deserialise(this.valueStr);
      }
      this.output();
    } catch (e) {
      this.errorMessage = 'Invalid'; // TODO: more detail
      this.valueChange.emit(undefined);
    }
  }
  
  private output(init: boolean = false) {
    this.valueChange.emit({valueStr: this.valueStr, value: this.value});
    if (this.directCharacterAccess && !init) {
      this.directCharacterAccess.put(this.property, this.value);
    }
  }
  
  onFocusChange() {
    this.showErrorMessage = !!this.errorMessage;
  }
  
}

export interface ValueChange<T> {
  valueStr: string;
  value: T | undefined
}