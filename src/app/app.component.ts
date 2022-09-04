import {Component} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {StaticProvider} from './static.provider';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog,
    private dragulaService: DragulaService
  ) {
    StaticProvider.dialog = dialog;
    dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
  }

}
