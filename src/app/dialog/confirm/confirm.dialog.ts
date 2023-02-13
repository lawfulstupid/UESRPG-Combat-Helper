import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/action-bar/action-bar.component";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'confirm.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class ConfirmDialog extends Dialog<ConfirmDialog> {
  
  override actions: Array<ActionItem> = [{
    label: this.data.yesButton || 'Yes',
    callback: () => this.dialogRef.close(true)
  }];
  
  constructor(
    dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig
  ) {
    super(dialogRef);
  }
  
}

export interface ConfirmDialogConfig {
  title: string;
  message: string;
  yesButton?: string;
  noButton?: string
}