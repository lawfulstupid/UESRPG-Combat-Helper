import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Identifier } from "src/app/model/identifier";
import { Property } from "src/app/model/property/abstract/property";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";

@Component({
  templateUrl: 'new-npc-template.dialog.html',
  styleUrls: ['../dialog.component.scss']
})
export class NewNpcTemplateDialog {
  
  actions: Array<ActionItem> = [{
    label: 'Save',
    callback: this.save.bind(this),
    isDisabled: () => !this.valid()
  }];
  
  preDefined: boolean = false;
  key?: string;
  name?: string;
  properties: {[key: string]: any} = {};
  requiredProperties: Array<Property<any>>;
  
  constructor(
    private dialogRef: MatDialogRef<NewNpcTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Identifier | undefined
  ) {
    this.requiredProperties = NpcTemplate.REQUIRED_PROPERTIES;
    if (this.data) {
      this.preDefined = true;
      this.key = data?.key;
      this.name = data?.name;
    }
  }
  
  save() {
    if (this.valid()) {
      const template = NpcTemplateManager.create(this.key, this.name, this.properties);
      this.dialogRef.close(template);
    }
  }
  
  valid(): boolean {
    return !!this.key && !!this.name && this.requiredProperties.every(property => !!this.properties[property.key]);
  }
  
}