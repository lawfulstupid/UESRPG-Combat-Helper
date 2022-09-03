import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {NpcComponent} from './components/npc/npc.component';
import {TestDialog} from './dialog/test/test.dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    NpcComponent,
    TestDialog
  ],
  entryComponents: [
    TestDialog
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DragulaModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
