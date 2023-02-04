import { Component, Inject } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EMPTY, forkJoin, mergeMap, Observable } from 'rxjs';
import { ActionItem } from 'src/app/components/actionbar/actionbar.component';
import { ValueChange } from 'src/app/components/property-input/property-input.component';
import { DataCharacter } from 'src/app/model/character/data-character';
import { Property } from 'src/app/model/property/abstract/property';
import { StaticProvider } from 'src/app/service/static.provider';
import { Dictionary, DictionaryUtil } from 'src/app/util/dictionary.util';

@Component({
  templateUrl: './required-values.dialog.html'
})
export class RequiredValuesDialog {

  actions: Array<ActionItem> = [{
    label: 'Submit',
    callback: this.respond.bind(this),
    isDisabled: () => !this.valid()
  }]
  
  private values: Dictionary<any> = {};

  constructor(
    private dialogRef: MatDialogRef<RequiredValuesDialog>,
    @Inject(MAT_DIALOG_DATA) public request: RequiredValuesRequest
  ) {}
  
  onValueChange<T>(property: Property<T>, change: ValueChange<T>) {
    this.values[property.key] = change?.value;
  }
  
  valid(): boolean {
    return this.request.properties.every(property => this.values[property.key] !== undefined);
  }

  respond() {
    if (this.valid()) {
      this.dialogRef.close(this.values);
    }
  }
  
  // Performs a request to the user to get required values, then saves the values entered
  static requestValues(requester: DataCharacter, ...properties: Array<Property<any>>): Observable<never> {
    // only request properties we don't already have
    const missingProperties: Array<Property<any>> = properties.filter(property => !requester.hasProperty(property));
    if (missingProperties.length === 0) {
      return EMPTY;
    }
    
    const config: MatDialogConfig = {
      data: {
        title: 'Required Values for ' + requester.name + ':',
        properties: missingProperties
      }
    };
    
    return StaticProvider.dialog.open(RequiredValuesDialog, config).afterClosed().pipe(mergeMap((values: Dictionary<any>) => {
      // Save all results to character
      // Each individual result is saved via DataCharacter.populate(property, value)
      // All collected into an array
      // ForkJoined Array<Observable> into Observable<Array> to wait for all to resolve
      return forkJoin(DictionaryUtil.mapToList(values, (key, value) => {
        // Find original property
        const property = <Property<any>>missingProperties.find(prop => prop.key === key);
        // Write value to character
        return requester.populate(property, value);
      })).pipe(mergeMap(() => {
        // MergeMap the result into EMPTY because we don't care about returning the actual values
        return EMPTY;
      }));
    }));
  }
  
}

interface RequiredValuesRequest {
  title: string;
  properties: Array<Property<any>>;
}