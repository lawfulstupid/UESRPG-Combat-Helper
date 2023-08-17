import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { Data, DataCharacter } from "src/app/model/character/data-character";
import { StaticProvider } from "src/app/service/static.provider";
import { ConfirmDialog, ConfirmDialogConfig } from "../confirm/confirm.dialog";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'edit-data-character.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class EditDataCharacterDialog extends Dialog<EditDataCharacterDialog> {
  
  override actions: Array<ActionItem> = [{
    label: 'Add Row',
    callback: this.addRow.bind(this)
  }, {
    label: 'Save',
    callback: this.save.bind(this)
  }, {
    label: 'Delete All',
    callback: this.deleteAll.bind(this)
  }];
  
  name: string;
  keys: Array<string> = [];
  data: Data;
  newRows: Array<[string, string]> = [];
  
  constructor(
    dialogRef: MatDialogRef<EditDataCharacterDialog>,
    @Inject(MAT_DIALOG_DATA) params: EditDataCharacterDialogParams
  ) {
    super(dialogRef);
    this.title = params.title;
    this.name = params.character.name;
    this.data = params.character.getData();
    this.computeKeys();
  }
  
  private computeKeys() {
    this.keys = Object.keys(this.data).sort();
  }
  
  addRow() {
    this.newRows.push(['','']);
  }
  
  deleteExistingRow(key: string) {
    delete this.data[key];
    this.computeKeys();
  }
  
  deleteNewRow(idx: number) {
    this.newRows.splice(idx, 1);
  }
  
  deleteAll() {
    const config: MatDialogConfig = {
      data: <ConfirmDialogConfig>{
        title: 'Delete All Properties',
        message: 'Are you sure?'
      }
    };
    StaticProvider.dialog.open(ConfirmDialog, config).afterClosed().subscribe(response => {
      if (response) {
        this.data = {};
        this.keys = [];
        this.newRows = [];
      }
    });
  }
  
  save() {
    const finalData: Data = {...this.data};
    this.newRows.forEach(row => {
      finalData[row[0]] = row[1];
    });
    this.dialogRef.close([this.name, finalData]);
  }
  
}

interface EditDataCharacterDialogParams {
  character: DataCharacter;
  title: string;
}