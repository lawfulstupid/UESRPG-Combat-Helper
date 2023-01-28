import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Identifier } from "src/app/model/lookup/identifier";
import { NpcTemplateRepository } from "src/app/service/npc-template-repository";

@Component({
  templateUrl: 'new-npc.dialog.html'
})
export class NewNpcDialog {
  
  templateList: Array<Identifier> = NpcTemplateRepository.list();
  selectedTemplate?: string;
  
  constructor(private dialogRef: MatDialogRef<NewNpcDialog>) {}
  
  select() {
    this.dialogRef.close(this.selectedTemplate);
  }
    
}