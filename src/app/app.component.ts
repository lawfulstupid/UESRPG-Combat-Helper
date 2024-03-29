import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { EventManager } from './service/event.manager';
import { NpcManager } from './service/npc.manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  public static instance: AppComponent;
  readonly environment = environment;
  
  @ViewChild(MatDrawer, {read: MatDrawer, static: false})
  drawer!: MatDrawer;
  
  constructor(
    public dialog: MatDialog
  ) {
    AppComponent.instance = this;
    if (!environment.production && !environment.mobile) {
      setTimeout(() => {
        EventManager.addNpcEvent.emit(NpcManager.create('Testificate', 'bandit'));
      }, 100);
    }
  }
  
  onDrawerOpen() {
    const drawerElm: Element = this.drawer['_elementRef'].nativeElement;
    const innerContainer = <Element> drawerElm.firstChild;
    innerContainer.scrollTo(0, innerContainer.scrollHeight);
  }

}
