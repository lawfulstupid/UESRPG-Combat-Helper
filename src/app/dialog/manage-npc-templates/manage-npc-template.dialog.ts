import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/lookup/identifier";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";

@Component({
  templateUrl: 'manage-npc-templates.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class ManageNpcTemplateDialog {
  
  actions: Array<ActionItem> = [{
    label: 'Edit',
    callback: this.edit.bind(this)
  }, {
    label: 'Delete',
    callback: this.delete.bind(this)
  }];
  
  templateList: Array<Identifier> = NpcTemplateManager.list();
  
  constructor(private dialogRef: MatDialogRef<ManageNpcTemplateDialog>) {}
  
  edit() {
    
  }
  
  delete() {
    
  }
  
}