import {
  Component,
  Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  templateUrl: 'value-request.dialog.html'
})
export class ValueRequestDialog {

  value: string = '';

  constructor(
    private dialogRef: MatDialogRef<ValueRequestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ValueRequest
  ) {}

  respond() {
    this.dialogRef.close(this.value);
  }

}

export interface ValueRequest {
  valueName: string;
}