import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LogComponent } from "src/app/components/log/log.component";
import { DialogUtil } from "src/app/util/dialog.util";
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
    LogComponent.log(data.message);
  }
  
  static placeholder(message: string) {
    const data = {
      title: 'Placeholder Info',
      message: message
    }
    DialogUtil.open(InfoDialog, data);
  }
  
}

export interface InfoDialogConfig {
  title: string;
  message: string;
}