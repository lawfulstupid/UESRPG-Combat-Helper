import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";

@Component({
  templateUrl: 'edit-npc-template.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class EditNpcTemplateDialog {
  
  actions: Array<ActionItem> = [{
    label: 'Add Row',
    callback: this.addRow.bind(this)
  }, {
    label: 'Save',
    callback: this.save.bind(this)
  }];
  
  name: string;
  keys: Array<string> = [];
  data: {[key: string]: any};
  newRows: Array<[string, string]> = [];
  
  constructor(
    private dialogRef: MatDialogRef<EditNpcTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public templateKey: string
  ) {
    const template = NpcTemplateManager.load(this.templateKey);
    this.name = template.name;
    this.data = template.getRawDataCopy();
    this.keys = Object.keys(this.data).sort();
  }
  
  addRow() {
    this.newRows.push(['','']);
  }
  
  deleteExistingRow(key: string) {
    delete this.data[key];
  }
  
  deleteNewRow(idx: number) {
    this.newRows.splice(idx, 1);
  }
  
  save() {
    const finalData = {...this.data};
    this.newRows.forEach(row => {
      finalData[row[0]] = row[1];
    });
    NpcTemplateManager.update(new NpcTemplate(this.templateKey, this.name, finalData));
    this.dialogRef.close();
  }
  
}