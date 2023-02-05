import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { DialogComponent } from "../dialog.component";

@Component({
  templateUrl: 'confirm.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class ConfirmDialog extends DialogComponent<ConfirmDialog> {
  
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