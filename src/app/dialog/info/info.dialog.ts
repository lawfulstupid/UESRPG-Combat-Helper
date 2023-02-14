import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'info.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class InfoDialog extends Dialog<InfoDialog> {
  
  constructor(
    dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogConfig
  ) {
    super(dialogRef);
  }
  
}

export interface InfoDialogConfig {
  title: string;
  message: string;
}