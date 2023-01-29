import { Component } from "@angular/core";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { EventManager } from "src/app/service/event.manager";
import { NpcManager } from "src/app/service/npc.manager";
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
  }];
  
  newNpc() {
    StaticProvider.dialog.open(NewNpcDialog, {}).afterClosed().subscribe(template => {
      if (template) {
        const npc = NpcManager.makeNewNpc(template);
        EventManager.addNpcEvent.emit(npc);
      }
    });
  }
  
  newNpcTemplate() {
    // TODO
  }
  
}