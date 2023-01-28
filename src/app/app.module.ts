import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import {AppComponent} from './app.component';
import {NpcComponent} from './components/npc/npc.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DragulaModule} from 'ng2-dragula';
import {ValueRequestDialog} from './dialog/value-request/value-request.dialog';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MenubarComponent } from './components/menubar/menubar.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { NewNpcDialog } from './dialog/new-npc/new-npc.dialog';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MenubarComponent,
    WorkspaceComponent,
    ActionbarComponent,
    NpcComponent,
    ValueRequestDialog,
    NewNpcDialog
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DragulaModule.forRoot(),
    FlexLayoutModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
