import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timeInterval, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventManager } from './service/event.manager';
import { NpcManager } from './service/npc.manager';
import { StaticProvider } from './service/static.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  autoAdd: boolean = true;

  constructor(
    private dialog: MatDialog
  ) {
    StaticProvider.dialog = dialog;
    if (!environment.production) {
      if (this.autoAdd) {
        setTimeout(() => {
          EventManager.addNpcEvent.emit(NpcManager.create('Testificate', 'bandit'));
        }, 100);
      }
    }
  }

}
