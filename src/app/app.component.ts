import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { EventManager } from './service/event.manager';
import { NpcManager } from './service/npc.manager';
import { StaticProvider } from './service/static.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  public static instance: AppComponent;
  
  @ViewChild('drawer', {read: MatDrawer, static: true})
  drawer!: MatDrawer;

  constructor(
    dialog: MatDialog
  ) {
    AppComponent.instance = this;
    StaticProvider.dialog = dialog;
    if (!environment.production) {
      setTimeout(() => {
        EventManager.addNpcEvent.emit(NpcManager.create('Testificate', 'bandit'));
      }, 100);
    }
  }

}
