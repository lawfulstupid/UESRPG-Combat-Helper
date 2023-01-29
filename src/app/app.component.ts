import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StaticProvider } from './service/static.provider';

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
