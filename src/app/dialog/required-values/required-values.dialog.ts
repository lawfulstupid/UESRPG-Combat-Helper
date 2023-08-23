import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EMPTY, Observable, forkJoin, mergeMap } from 'rxjs';
import { ActionItem } from 'src/app/components/common/action-bar/action-bar.component';
import { ValueChange } from 'src/app/components/common/property-input/property-input.component';
import { DataCharacter, FetchMethod } from 'src/app/model/character/data-character';
import { Property } from 'src/app/model/property/abstract/property';
import { DialogUtil } from 'src/app/util/dialog.util';
import { Dictionary, DictionaryUtil } from 'src/app/util/dictionary.util';
import { Dialog } from '../dialog';

@Component({
  templateUrl: './required-values.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class RequiredValuesDialog extends Dialog<RequiredValuesDialog, RequiredValuesRequest, Dictionary<any>> {
  
  override actions: Array<ActionItem> = [{
    label: 'Submit',
    callback: this.respond.bind(this),
    isDisabled: () => !this.valid()
  }]
  
  private values: Dictionary<any> = {};

  constructor(
    dialogRef: MatDialogRef<RequiredValuesDialog>,
    @Inject(MAT_DIALOG_DATA) public request: RequiredValuesRequest
  ) {
    super(dialogRef);
  }
  
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
    
    const data: RequiredValuesRequest = {
      title: 'Required Values for ' + requester.name + ':',
      properties: missingProperties
    };
    
    return DialogUtil.open(RequiredValuesDialog, data).pipe(mergeMap((values: Dictionary<any>) => {
      // Save all results to character
      // Each individual result is saved via DataCharacter.populate(property, value)
      // All collected into an array
      // ForkJoined Array<Observable> into Observable<Array> to wait for all to resolve
      return forkJoin(DictionaryUtil.mapToList(values, (key, value) => {
        // Find original property
        const property = <Property<any>>missingProperties.find(prop => prop.key === key);
        // Write value to character
        return requester.populate(property, FetchMethod.USE_VALUE(value));
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