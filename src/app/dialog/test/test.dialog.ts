import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import {
  Component,
  Inject
} from '@angular/core';

@Component({
  templateUrl: 'test.dialog.html'
})
export class TestDialog {

  response: string = '';

  constructor(
    private dialogRef: MatDialogRef<TestDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  sendResponse() {
    this.dialogRef.close(this.response);
  }

}