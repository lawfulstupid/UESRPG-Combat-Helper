import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'confirm.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class ConfirmDialog extends Dialog<ConfirmDialog, ConfirmDialogConfig, boolean> {
  
  override actions: Array<ActionItem> = [{
    label: this.data.yesButton || 'Yes',
    callback: () => this.dialogRef.close(true)
  }];
  
  readonly lines: Array<string>;
  
  constructor(
    dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig
  ) {
    super(dialogRef);
    this.lines = data.message.split('\n');
  }
  
}

export interface ConfirmDialogConfig {
  title: string;
  message: string;
  yesButton?: string;
  noButton?: string
}