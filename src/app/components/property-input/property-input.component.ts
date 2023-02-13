import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { catchError, EMPTY } from "rxjs";
import { DataCharacter, FetchMethod } from "src/app/model/character/data-character";
import { Property, TemplateRole } from "src/app/model/property/abstract/property";
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
    
    if (property instanceof EnumProperty) {
      this.enumProperty = property;
    } else if (property instanceof TextAreaProperty) {
      this.textAreaProperty = property;
    } else {
      this.defaultProperty = property;
    }
  }
  
  @Input()
  allowBlank: boolean = false;
  
  @Input()
  directCharacterAccess?: DataCharacter;
  
  private property!: Property<T>;
  // Only one of the below will be populated -- determines how property input is displayed
  defaultProperty?: Property<T>;
  textAreaProperty?: TextAreaProperty;
  enumProperty?: EnumProperty<any>;
  
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
      this.directCharacterAccess.getProperty(this.property, FetchMethod.SILENT)
        .pipe(catchError(() => EMPTY))
        .subscribe(value => {
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