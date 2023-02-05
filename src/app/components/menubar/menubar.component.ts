import { Component, OnInit } from "@angular/core";
import { ManageNpcTemplatesDialog } from "src/app/dialog/manage-npc-templates/manage-npc-templates.dialog";
import { NewNpcTemplateDialog } from "src/app/dialog/new-npc-template/new-npc-template.dialog";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { EventManager } from "src/app/service/event.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { RandomUtil } from "src/app/util/random.util";
import { ActionItem } from "../actionbar/actionbar.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  
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
  
  ngOnInit() {
    let [r,g,b] = [0,0,0];
    while (r+g+b < 100) {
      [r,g,b] = [RandomUtil.d(255),RandomUtil.d(255),RandomUtil.d(255)];
    }
    document.getElementById('menubar')!.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  
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
    StaticProvider.dialog.open(ManageNpcTemplatesDialog);
  }
  
}