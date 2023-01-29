import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/lookup/identifier";
import { Npc } from "src/app/model/npc";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { NewNpcTemplateDialog } from "../new-npc-template/new-npc-template.dialog";

@Component({
  templateUrl: 'manage-npc-templates.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class ManageNpcTemplateDialog {
  
  actions: Array<ActionItem> = [{
    label: 'New',
    callback: this.newTemplate.bind(this)
  }];
  
  rowActions: Array<ActionItem> = [{
    label: 'Edit',
    callback: this.editTemplate.bind(this)
  }, {
    label: 'Delete',
    callback: this.deleteTemplate.bind(this)
  }];
  
  templateList: Array<Identifier> = [];
  
  constructor(private dialogRef: MatDialogRef<ManageNpcTemplateDialog>) {
    this.loadTemplateList();
  }
  
  loadTemplateList() {
    this.templateList = NpcTemplateManager.list();
  }
  
  newTemplate() {
    StaticProvider.dialog.open(NewNpcTemplateDialog).afterClosed().subscribe(() => {
      this.loadTemplateList();
    });
  }
  
  editTemplate(templateKey: string) {
    
  }
  
  deleteTemplate(templateKey: string) {
    NpcTemplateManager.delete(templateKey);
    this.loadTemplateList();
  }
  
}