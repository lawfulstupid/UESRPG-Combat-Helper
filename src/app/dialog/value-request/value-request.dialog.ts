import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialogConfig,
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { mergeMap, Observable, of, throwError } from 'rxjs';
import { ActionItem } from 'src/app/components/action-bar/action-bar.component';
import { ValueChange } from 'src/app/components/property-input/property-input.component';
import { DataCharacter } from 'src/app/model/character/data-character';
import { Property } from 'src/app/model/property/abstract/property';
import { StaticProvider } from 'src/app/service/static.provider';
import { Dialog } from '../dialog';

@Component({
  templateUrl: 'value-request.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class ValueRequestDialog<T> extends Dialog<ValueRequestDialog<T>> {

  override actions: Array<ActionItem> = [{
    label: 'Submit',
    callback: this.respond.bind(this),
    isDisabled: () => !this.valid()
  }]
  
  value?: T;

  constructor(
    dialogRef: MatDialogRef<ValueRequestDialog<T>>,
    @Inject(MAT_DIALOG_DATA) public request: ValueRequest<T>
  ) {
    super(dialogRef);
  }
  
  onValueChange(change: ValueChange<T>) {
    this.value = change?.value;
  }
  
  valid(): boolean {
    return this.value !== undefined;
  }

  respond() {
    if (this.valid()) {
      this.dialogRef.close(this.value);
    }
  }
  
  /* Static methods */
  
  // Performs a request to the user to get a value
  static requestValue<T>(property: Property<T>, requester?: DataCharacter, required: boolean = false): Observable<T> {
    return this.doRequest({
      property: property,
      message: (requester ? requester.name + '\'s ' : '') + property.trueName + ':',
      required: required
    });
  }
  
  // Performs a request to the user to get a change to a value
  static requestValueChange<T>(property: Property<T>, required: boolean = false): Observable<T> {
    return this.doRequest({
      property: property,
      message: property.trueName + ' change:',
      required: required
    });
  }
  
  private static doRequest<T>(request: ValueRequest<T>): Observable<T> {
    const config: MatDialogConfig = {
      disableClose: request.required,
      data: request
    };
    return StaticProvider.dialog.open(ValueRequestDialog<T>, config).afterClosed().pipe(mergeMap(value => {
      if (value === undefined) {
        // Throw error if undefined, so .subscribe() never triggers
        return throwError(() => new Error('No value provided for ' + request.property.trueName));
      } else {
        return of(value);
      }
    }));
  }
  
}

interface ValueRequest<T> {
  property: Property<T>;
  message: string;
  required: boolean;
}