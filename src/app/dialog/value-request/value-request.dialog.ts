import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ActionItem } from 'src/app/components/actionbar/actionbar.component';
import { DataCharacter } from 'src/app/model/data-character';
import { Property } from 'src/app/model/lookup/property';
import { StaticProvider } from 'src/app/static.provider';

@Component({
  templateUrl: 'value-request.dialog.html'
})
export class ValueRequestDialog {

  actions: Array<ActionItem> = [{
    label: 'Submit',
    callback: this.respond.bind(this)
  }]
  
  value: string = '';

  constructor(
    private dialogRef: MatDialogRef<ValueRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ValueRequest
  ) {}

  respond() {
    this.dialogRef.close(this.value);
  }
  
  // performs a request to the user to get a value
  static requestValue<T>(requester: DataCharacter, property: Property, castFn: (json: string) => T): Observable<T> {
    const config = {
      data: <ValueRequest>{
        entityName: requester.name,
        valueName: property.name
      }
    }
    
    return StaticProvider.dialog.open(ValueRequestDialog, config).afterClosed().pipe(map(castFn));
  }

}

export interface ValueRequest {
  entityName: string;
  valueName: string;
}