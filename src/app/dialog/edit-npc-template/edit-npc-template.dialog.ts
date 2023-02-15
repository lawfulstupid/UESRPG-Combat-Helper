import { Component, Inject } from "@angular/core";
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { Data } from "src/app/model/character/data-character";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { ConfirmDialog, ConfirmDialogConfig } from "../confirm/confirm.dialog";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'edit-npc-template.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class EditNpcTemplateDialog extends Dialog<EditNpcTemplateDialog> {
  
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
    dialogRef: MatDialogRef<EditNpcTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public templateKey: string
  ) {
    super(dialogRef);
    const template = NpcTemplateManager.load(this.templateKey);
    this.name = template.name;
    this.data = template.getData();
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
    NpcTemplateManager.update(new NpcTemplate(this.templateKey, this.name, finalData));
    this.dialogRef.close();
  }
  
}