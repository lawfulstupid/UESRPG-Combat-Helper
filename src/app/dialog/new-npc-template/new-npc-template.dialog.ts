import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { Dialog } from "../dialog";

@Component({
  templateUrl: 'new-npc-template.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class NewNpcTemplateDialog extends Dialog<NewNpcTemplateDialog, void, NpcTemplate> {
  
  override actions: Array<ActionItem> = [{
    label: 'Save',
    callback: this.save.bind(this),
    isDisabled: () => !this.valid()
  }];
  
  key: string = '';
  name: string = '';
  
  constructor(
    dialogRef: MatDialogRef<NewNpcTemplateDialog>
  ) {
    super(dialogRef);
    
    // Auto-close if no data needs entering
    if (this.valid()) {
      this.save();
    }
  }
  
  save() {
    if (this.valid()) {
      const template = NpcTemplateManager.create(new NpcTemplate(this.key, this.name));
      this.dialogRef.close(template);
    }
  }
  
  valid(): boolean {
    return !!this.key && !!this.name;
  }
  
}