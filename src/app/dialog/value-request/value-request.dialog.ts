import {
  Component,
  Inject
} from '@angular/core';
import {
  MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { ActionItem } from 'src/app/components/actionbar/actionbar.component';
import { DataCharacter } from 'src/app/model/data-character';
import { Property } from 'src/app/model/lookup/property';
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
    @Inject(MAT_DIALOG_DATA) public data: ValueRequest<T>
  ) {}
  
  onValueChange(value: T) {
    this.value = value;
  }
  
  valid(): boolean {
    return this.value !== undefined;
  }

  respond() {
    if (this.valid()) {
      this.dialogRef.close(this.value);
    }
  }
  
  // performs a request to the user to get a value
  static requestValue<T>(requester: DataCharacter, property: Property<T>): Observable<T> {
    const config = {
      data: <ValueRequest<T>>{
        entityName: requester.name,
        property: property
      }
    }
    
    return StaticProvider.dialog.open(ValueRequestDialog<T>, config).afterClosed().pipe(mergeMap(value => {
      // eliminate the value if undefined, so .subscribe() never triggers
      if (value === undefined) {
        return EMPTY;
      } else {
        return of(value);
      }
    }));
  }

}

export interface ValueRequest<T> {
  entityName: string;
  property: Property<T>;
}