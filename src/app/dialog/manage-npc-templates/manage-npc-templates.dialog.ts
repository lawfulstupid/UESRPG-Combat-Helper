import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { faDownload, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Observable, of } from "rxjs";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { Npc } from "src/app/model/character/npc";
import { NpcTemplate } from "src/app/model/character/npc-template";
import { Identifier } from "src/app/model/identifier";
import { EventManager } from "src/app/service/event.manager";
import { NpcTemplateManager } from "src/app/service/npc-template.manager";
import { DialogUtil } from "src/app/util/dialog.util";
import { FileUtil } from "src/app/util/file.util";
import { StageComponent } from "../../components/stage/stage.component";
import { ConfirmDialog, ConfirmDialogConfig } from "../confirm/confirm.dialog";
import { Dialog } from "../dialog";
import { EditDataCharacterDialog, EditCharacterConfig } from "../edit-data-character/edit-data-character.dialog";
import { NewNpcTemplateDialog } from "../new-npc-template/new-npc-template.dialog";

@Component({
  templateUrl: 'manage-npc-templates.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class ManageNpcTemplatesDialog extends Dialog<ManageNpcTemplatesDialog, void, void> {
  
  override actions: Array<ActionItem> = [{
    label: 'New',
    callback: this.newTemplate.bind(this)
  }, {
    label: 'Import',
    callback: this.importTemplate.bind(this)
  }, {
    label: 'Export All',
    callback: this.exportAllTemplates.bind(this)
  }];
  
  rowActions: Array<ActionItem> = [{
    icon: faPencil,
    label: 'Edit',
    callback: this.editTemplate.bind(this)
  }, {
    icon: faTrash,
    label: 'Delete',
    callback: this.deleteTemplate.bind(this)
  }, {
    icon: faDownload,
    label: 'Export',
    callback: this.exportTemplate.bind(this)
  }];
  
  templateList: Array<Identifier> = [];
  
  constructor(dialogRef: MatDialogRef<ManageNpcTemplatesDialog>) {
    super(dialogRef);
    this.loadTemplateList();
  }
  
  loadTemplateList() {
    this.templateList = NpcTemplateManager.list();
  }
  
  newTemplate() {
    DialogUtil.open(NewNpcTemplateDialog).subscribe(() => {
      this.loadTemplateList();
    });
  }
  
  editTemplate(templateKey: string) {
    const template = NpcTemplateManager.load(templateKey);
    const data: EditCharacterConfig = {
      title: 'Edit NPC Template',
      character: template
    };
    DialogUtil.open(EditDataCharacterDialog, data).subscribe(update => {
      NpcTemplateManager.update(new NpcTemplate(templateKey, update.name, update.data));
    });
  }
  
  deleteTemplate(templateKey: string) {
    // Check for NPCs using the template first
    const npcs: Array<Npc> = StageComponent.instance.columns
      .flatMap(column => column)
      .map(component => component.instance.npc)
      .filter(npc => npc.getTemplateKey() === templateKey);
    
    let confirmation: Observable<boolean>;
    if (npcs.length === 0) {
      confirmation = of(true);
    } else {
      const data: ConfirmDialogConfig = {
        title: 'Delete NPCs',
        message: '' + npcs.length + ' NPC' + (npcs.length === 1 ? ' is' : 's are') + ' currently using this template: '
          + npcs.map(npc => npc.name).join(', ') + '.\n'
          + (npcs.length === 1 ? 'This' : 'These') + ' must be removed before the template can be deleted.',
        yesButton: 'Proceed',
        noButton: 'Cancel'
      };
      confirmation = DialogUtil.open(ConfirmDialog, data);
    }
    
    confirmation.subscribe(confirmed => {
      if (confirmed) {
        npcs.forEach(npc => {
          EventManager.removeNpcEvent.emit(npc);
        });
        NpcTemplateManager.delete(templateKey);
        this.loadTemplateList();
      }
    });
  }
  
  exportTemplate(templateKey: string) {
    const template: NpcTemplate = NpcTemplateManager.load(templateKey);
    FileUtil.download(NpcTemplateManager.instance.serialise(template), templateKey + '.json');
  }
  
  exportAllTemplates() {
    this.templateList.forEach(id => {
      const template: NpcTemplate = NpcTemplateManager.load(id.key);
      FileUtil.zip(NpcTemplateManager.instance.serialise(template), id.key + '.json');
    });
    FileUtil.downloadZip('templates.zip');
  }
  
  importTemplate() {
    FileUtil.uploadMany<string>().subscribe(templateStrs => {
      templateStrs.forEach(templateStr => {
        const template: NpcTemplate = NpcTemplateManager.instance.deserialise(templateStr);
        NpcTemplateManager.create(template);
      });
      this.loadTemplateList();
    });
  }
  
}