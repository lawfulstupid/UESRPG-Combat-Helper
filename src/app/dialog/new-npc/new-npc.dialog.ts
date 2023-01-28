import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "src/app/components/actionbar/actionbar.component";
import { Identifier } from "src/app/model/lookup/identifier";
import { NpcTemplateRepository } from "src/app/service/npc-template-repository";
import { DialogComponent } from "../dialog.component";

@Component({
  templateUrl: 'new-npc.dialog.html'
})
export class NewNpcDialog {
  
  actions: Array<ActionItem> = [{
    label: 'Select',
    callback: this.select.bind(this)
  }]
  
  templateList: Array<Identifier> = NpcTemplateRepository.list();
  selectedTemplate?: string;
  
  constructor(private dialogRef: MatDialogRef<NewNpcDialog>) {}
  
  select() {
    this.dialogRef.close(this.selectedTemplate);
  }
    
}