import { Component } from "@angular/core";
import { MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/identifier";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { EditNpcTemplateDialog } from "../edit-npc-template/edit-npc-template.dialog";
import { NewNpcTemplateDialog } from "../new-npc-template/new-npc-template.dialog";

@Component({
  templateUrl: 'manage-npc-templates.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class ManageNpcTemplatesDialog {
  
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
  
  constructor(private dialogRef: MatDialogRef<ManageNpcTemplatesDialog>) {
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
    const config: MatDialogConfig = { data: templateKey };
    StaticProvider.dialog.open(EditNpcTemplateDialog, config);
  }
  
  deleteTemplate(templateKey: string) {
    NpcTemplateManager.delete(templateKey);
    this.loadTemplateList();
  }
  
}