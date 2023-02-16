import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ManageNpcTemplatesDialog } from "src/app/dialog/manage-npc-templates/manage-npc-templates.dialog";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { Npc } from "src/app/model/character/npc";
import { EventManager } from "src/app/service/event.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { RandomUtil } from "src/app/util/random.util";
import { environment } from "src/environments/environment";
import { ActionItem } from "../common/action-bar/action-bar.component";
import { StageComponent } from "../stage/stage.component";

@Component({
  selector: 'app-menubar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
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
    callback: this.newRound.bind(this)
  }, {
    label: 'Export',
    callback: () => {EventManager.exportStageEvent.emit();}
  }, {
    label: 'Import',
    callback: () => {EventManager.importStageEvent.emit();},
    separator: true
  }, {
    label: 'New NPC',
    callback: this.newNpc.bind(this)
  }, {
    label: 'Manage Templates',
    callback: this.manageNpcTemplates.bind(this),
    separator: true
  }, {
    label: 'Log',
    callback: this.openLog.bind(this)
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
  
  private newNpc() {
    StaticProvider.dialog.open(NewNpcDialog).afterClosed().subscribe(npc => {
      if (npc) {
        EventManager.addNpcEvent.emit(npc);
      }
    });
  }
  
  private manageNpcTemplates() {
    StaticProvider.dialog.open(ManageNpcTemplatesDialog);
  }
  
  private newRound() {
    EventManager.newRoundEvent.emit();
  }
  
  private openLog() {
    AppComponent.instance.drawer.open();
  }
  
  private test() {
    const npc: Npc = StageComponent.instance.componentRefs[0].instance.npc;
  }
  
}