import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Identifier } from "src/app/model/identifier";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { NpcManager } from "src/app/service/npc.manager";
import { SearchUtil } from "src/app/util/search.util";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'new-npc.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class NewNpcDialog extends Dialog<NewNpcDialog> {
  
  override actions: Array<ActionItem> = [{
    label: 'Create',
    callback: this.create.bind(this),
    isDisabled: () => !this.valid()
  }, {
    label: 'New Template',
    callback: this.newTemplateOptions.bind(this),
    isHidden: () => this.newTemplate
  }, {
    label: 'Existing Template',
    callback: this.existingTemplateOptions.bind(this),
    isHidden: () => !this.newTemplate || this.templateList.length === 0
  }];
  
  templateList: Array<Identifier> = NpcTemplateManager.list();
  filteredTemplateList: Array<Identifier> = [];
  
  name?: string;
  nameDirty: boolean = false;
  newTemplate: boolean = false;
  templateKey?: string;
  templateName?: string;
  
  constructor(dialogRef: MatDialogRef<NewNpcDialog>) {
    super(dialogRef);
    if (this.templateList.length === 0) {
      this.newTemplateOptions();
    }
    this.filterTemplates('');
  }
  
  filterTemplates(search: string) {
    this.filteredTemplateList = this.templateList.filter(template => {
      return SearchUtil.matchAny(search, template.name, template.key);
    });
  }
  
  onSelectTemplate() {
    if (this.templateKey && !this.nameDirty) {
      this.name = this.templateList.find(template => template.key === this.templateKey)!.name;
    }
  }
  
  onTemplateNameChange() {
    if (this.templateName && !this.nameDirty) {
      this.name = this.templateName;
    }
  }
  
  create() {
    if (this.valid()) {
      if (this.newTemplate) {
        NpcTemplateManager.create(new NpcTemplate(<string>this.templateKey, <string>this.templateName));
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