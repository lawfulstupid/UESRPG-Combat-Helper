import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { ValueChange } from "src/app/components/common/property-input/property-input.component";
import { Data } from "src/app/model/character/data-character";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Identifier } from "src/app/model/identifier";
import { Property } from "src/app/model/property/abstract/property";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'new-npc-template.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class NewNpcTemplateDialog extends Dialog<NewNpcTemplateDialog> {
  
  override actions: Array<ActionItem> = [{
    label: 'Save',
    callback: this.save.bind(this),
    isDisabled: () => !this.valid()
  }];
  
  preDefined: boolean = false;
  key?: string;
  name?: string;
  properties: Data = {};
  requiredProperties: Array<Property<any>>; // TODO: remove this
  
  constructor(
    dialogRef: MatDialogRef<NewNpcTemplateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Identifier | undefined
  ) {
    super(dialogRef);
    this.requiredProperties = [];
    if (this.data) {
      this.preDefined = true;
      this.key = data?.key;
      this.name = data?.name;
    }
    
    // Auto-close if no data needs entering
    if (this.valid()) {
      this.save();
    }
  }
  
  save() {
    if (this.valid()) {
      const template = NpcTemplateManager.create(new NpcTemplate(<string>this.key, <string>this.name, this.properties));
      this.dialogRef.close(template);
    }
  }
  
  valid(): boolean {
    return !!this.key && !!this.name && this.requiredProperties.every(property => !!this.properties[property.key]);
  }
  
  onValueChange<T>(property: Property<T>, change: ValueChange<T>) {
    this.properties[property.key] = change?.valueStr;
  }
  
}