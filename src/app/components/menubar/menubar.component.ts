import { Component } from "@angular/core";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { StaticProvider } from "src/app/static.provider";
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
    StaticProvider.dialog.open(NewNpcDialog, {}).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
  newNpcTemplate() {
    // TODO
  }
  
}