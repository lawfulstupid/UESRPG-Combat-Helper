import { Component } from "@angular/core";
import { ManageNpcTemplateDialog } from "src/app/dialog/manage-npc-templates/manage-npc-template.dialog";
import { NewNpcTemplateDialog } from "src/app/dialog/new-npc-template/new-npc-template.dialog";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { EventManager } from "src/app/service/event.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { ActionItem } from "../actionbar/actionbar.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  
  actions: Array<ActionItem> = [{
    label: 'New NPC',
    callback: this.newNpc.bind(this)
  }, {
    label: 'New Template',
    callback: this.newNpcTemplate.bind(this)
  }, {
    label: 'Manage Templates',
    callback: this.manageNpcTemplates.bind(this)
  }];
  
  newNpc() {
    StaticProvider.dialog.open(NewNpcDialog).afterClosed().subscribe(npc => {
      if (npc) {
        EventManager.addNpcEvent.emit(npc);
      }
    });
  }
  
  newNpcTemplate() {
    StaticProvider.dialog.open(NewNpcTemplateDialog);
  }
  
  manageNpcTemplates() {
    StaticProvider.dialog.open(ManageNpcTemplateDialog);
  }
  
}