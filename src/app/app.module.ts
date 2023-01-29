import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragulaModule } from 'ng2-dragula';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppComponent } from './app.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NpcComponent } from './components/npc/npc.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { DialogComponent } from './dialog/dialog.component';
import { ManageNpcTemplateDialog } from './dialog/manage-npc-templates/manage-npc-template.dialog';
import { NewNpcTemplateDialog } from './dialog/new-npc-template/new-npc-template.dialog';
import { NewNpcDialog } from './dialog/new-npc/new-npc.dialog';
import { ValueRequestDialog } from './dialog/value-request/value-request.dialog';
import { ActionItemFilterPipe } from './pipe/action-item-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MenubarComponent,
    WorkspaceComponent,
    ActionbarComponent,
    NpcComponent,
    ValueRequestDialog,
    NewNpcDialog,
    NewNpcTemplateDialog,
    ManageNpcTemplateDialog,
    ActionItemFilterPipe
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
  bootstrap: [AppComponent]
})
export class AppModule { }
