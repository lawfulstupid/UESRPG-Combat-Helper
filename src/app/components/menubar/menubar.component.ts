import { Component, OnInit } from "@angular/core";
import { ManageNpcTemplatesDialog } from "src/app/dialog/manage-npc-templates/manage-npc-templates.dialog";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { EventManager } from "src/app/service/event.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { RandomUtil } from "src/app/util/random.util";
import { environment } from "src/environments/environment";
import { ActionItem } from "../actionbar/actionbar.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  
  readonly version = environment.appVersion;
  
  actions: Array<ActionItem> = [{
    label: 'Test',
    callback: this.test.bind(this),
    separator: true,
    isHidden: () => environment.production
  }, {
    label: 'New Round',
    callback: this.newRound.bind(this),
    separator: true
  }, {
    label: 'New NPC',
    callback: this.newNpc.bind(this)
  }, {
    label: 'Manage Templates',
    callback: this.manageNpcTemplates.bind(this)
  }];
  
  ngOnInit() {
    let [r,g,b] = [0,0,0];
    let lum = 0;
    while (lum < 128 || lum > 200) {
      [r,g,b] = [RandomUtil.d(255),RandomUtil.d(255),RandomUtil.d(255)];
      lum = 0.2126*r + 0.7152*g + 0.0722*b;
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
  
  manageNpcTemplates() {
    StaticProvider.dialog.open(ManageNpcTemplatesDialog);
  }
  
  newRound() {
    EventManager.newRoundEvent.emit();
  }
  
  test() {
  }
  
}