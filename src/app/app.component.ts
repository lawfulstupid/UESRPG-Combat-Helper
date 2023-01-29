import {Component} from '@angular/core';
import {StaticProvider} from './static.provider';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog
  ) {
    StaticProvider.dialog = dialog;
  }

}
