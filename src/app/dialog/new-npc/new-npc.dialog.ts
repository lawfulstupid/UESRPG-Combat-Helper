import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/property/identifier";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { NpcManager } from "src/app/service/npc.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { NewNpcTemplateDialog } from "../new-npc-template/new-npc-template.dialog";

@Component({
  templateUrl: 'new-npc.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class NewNpcDialog {
  
  actions: Array<ActionItem> = [{
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
    isHidden: () => !this.newTemplate
  }];
  
  templateList: Array<Identifier> = NpcTemplateManager.list();
  filteredTemplateList: Array<Identifier> = this.templateList;
  
  name?: string;
  nameDirty: boolean = false;
  newTemplate: boolean = false;
  templateKey?: string;
  templateName?: string;
  
  constructor(private dialogRef: MatDialogRef<NewNpcDialog>) {}
  
  filterTemplates(search: string) {
    const searchI = search.toLocaleLowerCase();
    this.filteredTemplateList = this.templateList.filter(template => {
      return template.name.toLocaleLowerCase().includes(searchI)
        || template.key.toLocaleLowerCase().includes(searchI);
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
        const config = { data: new Identifier(<string>this.templateKey, <string>this.templateName) };
        StaticProvider.dialog.open(NewNpcTemplateDialog, config).afterClosed().subscribe(template => {
          this.createAndClose();
        });
      } else {
        this.createAndClose();
      }
    }
  }
  
  private createAndClose() {
    const npc = NpcManager.create(this.name, this.templateKey);
    this.dialogRef.close(npc);
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