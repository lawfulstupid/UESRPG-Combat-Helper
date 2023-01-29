import { Dialog } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/lookup/identifier";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { NpcManager } from "src/app/service/npc.manager";

@Component({
  templateUrl: 'new-npc.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class NewNpcDialog {
  
  actions: Array<ActionItem> = [{
    label: 'Create',
    callback: this.create.bind(this),
    isDisabled: () => !this.name || !this.selectedTemplate
  }]
  
  templateList: Array<Identifier> = NpcTemplateManager.list();
  
  name?: string;
  selectedTemplate?: string;
  
  constructor(private dialogRef: MatDialogRef<NewNpcDialog>) {}
  
  create() {
    if (this.name && this.selectedTemplate) {
      const npc = NpcManager.makeNewNpc(this.name, this.selectedTemplate);
      this.dialogRef.close(npc);
    }
  }
  
}