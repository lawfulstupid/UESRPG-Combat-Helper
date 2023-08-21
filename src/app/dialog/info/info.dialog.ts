import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { LogComponent } from "src/app/components/log/log.component";
import { StaticProvider } from "src/app/service/static.provider";
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
    const config: MatDialogConfig = {
      data: {
        title: 'Placeholder Info',
        message: message
      }
    }
    StaticProvider.dialog.open(InfoDialog, config);
  }
  
}

export interface InfoDialogConfig {
  title: string;
  message: string;
}