import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialogConfig,
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { mergeMap, Observable, of, throwError } from 'rxjs';
import { ActionItem } from 'src/app/components/actionbar/actionbar.component';
import { ValueChange } from 'src/app/components/property-input/property-input.component';
import { DataCharacter } from 'src/app/model/character/data-character';
import { Property } from 'src/app/model/property/abstract/property';
import { StaticProvider } from 'src/app/service/static.provider';

@Component({
  templateUrl: 'value-request.dialog.html'
})
export class ValueRequestDialog<T> {

  actions: Array<ActionItem> = [{
    label: 'Submit',
    callback: this.respond.bind(this),
    isDisabled: () => !this.valid()
  }]
  
  value?: T;

  constructor(
    private dialogRef: MatDialogRef<ValueRequestDialog<T>>,
    @Inject(MAT_DIALOG_DATA) public request: ValueRequest<T>
  ) {}
  
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
  static requestValue<T>(property: Property<T>, requester: DataCharacter): Observable<T> {
    return this.doRequest({
      property: property,
      message: requester.name + '\'s ' + property.name + ':'
    });
  }
  
  // Performs a request to the user to get a change to a value
  static requestValueChange<T>(property: Property<T>): Observable<T> {
    return this.doRequest({
      property: property,
      message: property.name + ' change:'
    });
  }
  
  private static doRequest<T>(request: ValueRequest<T>): Observable<T> {
    const config: MatDialogConfig = { data: request };
    return StaticProvider.dialog.open(ValueRequestDialog<T>, config).afterClosed().pipe(mergeMap(value => {
      if (value === undefined) {
        // Throw error if undefined, so .subscribe() never triggers
        return throwError(() => new Error('No value provided for ' + request.property.name));
      } else {
        return of(value);
      }
    }));
  }
  
}

interface ValueRequest<T> {
  property: Property<T>;
  message: string;
}