import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";

@Component({
  templateUrl: 'confirm.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class ConfirmDialog {
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogConfig
  ) {}
    
  actions: Array<ActionItem> = [{
    label: this.data.yesButton || 'Yes',
    callback: () => this.dialogRef.close(true)
  }];
  
}

export interface ConfirmDialogConfig {
  title: string;
  message: string;
  yesButton?: string;
  noButton?: string
}