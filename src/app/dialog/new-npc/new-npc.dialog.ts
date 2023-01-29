import { Dialog } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TitleStrategy } from "@angular/router";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/lookup/identifier";
import { NpcTemplate } from "src/app/model/npc-template";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { NpcManager } from "src/app/service/npc.manager";

@Component({
  templateUrl: 'new-npc.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class NewNpcDialog {
  
  actions: Array<ActionItem> = [{
    label: 'New Template',
    callback: this.newTemplateOptions.bind(this),
    isHidden: () => this.newTemplate
  }, {
    label: 'Existing Template',
    callback: this.existingTemplateOptions.bind(this),
    isHidden: () => !this.newTemplate
  }, {
    label: 'Create',
    callback: this.create.bind(this),
    isDisabled: () => !this.valid()
  }]
  
  templateList: Array<Identifier> = NpcTemplateManager.list();
  
  name?: string;
  newTemplate: boolean = false;
  templateKey?: string;
  templateName?: string;
  
  constructor(private dialogRef: MatDialogRef<NewNpcDialog>) {}
  
  create() {
    if (this.valid()) {
      if (this.newTemplate) {
        NpcTemplateManager.create(this.templateKey, this.templateName);
      }
      const npc = NpcManager.create(this.name, this.templateKey);
      this.dialogRef.close(npc);
    }
  }
  
  newTemplateOptions() {
    this.newTemplate = true;
    this.templateKey = undefined;
  }
  
  existingTemplateOptions() {
    this.newTemplate = false;
    this.templateKey = undefined;
    this.templateName = undefined;
  }
  
  valid(): boolean {
    return !!(this.name && this.templateKey && (this.newTemplate ? this.templateName : true));
  }
  
}