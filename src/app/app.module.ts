import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragulaModule } from 'ng2-dragula';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppComponent } from './app.component';
import { ActionbarComponent } from './components/actionbar/actionbar.component';
import { AttributeBarComponent } from './components/attribute-bar/attribute-bar.component';
import { LongPressButtonComponent } from './components/long-press-button/long-press-button.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NpcComponent } from './components/npc/npc.component';
import { PixelRounderComponent } from './components/pixel-rounder/pixel-rounder.component';
import { PropertyInputComponent } from './components/property-input/property-input.component';
import { SkillRollerComponent } from './components/skill-roller/skill-roller.component';
import { StageComponent } from './components/stage/stage.component';
import { ConfirmDialog } from './dialog/confirm/confirm.dialog';
import { Dialog } from './dialog/dialog';
import { EditNpcTemplateDialog } from './dialog/edit-npc-template/edit-npc-template.dialog';
import { ManageNpcTemplatesDialog } from './dialog/manage-npc-templates/manage-npc-templates.dialog';
import { NewNpcTemplateDialog } from './dialog/new-npc-template/new-npc-template.dialog';
import { NewNpcDialog } from './dialog/new-npc/new-npc.dialog';
import { RequiredValuesDialog } from './dialog/required-values/required-values.dialog';
import { ValueRequestDialog } from './dialog/value-request/value-request.dialog';
import { ActionItemFilterPipe } from './pipe/action-item-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    StageComponent,
    ActionbarComponent,
    NpcComponent,
    PropertyInputComponent,
    AttributeBarComponent,
    LongPressButtonComponent,
    SkillRollerComponent,
    PixelRounderComponent,
    Dialog,
    ValueRequestDialog,
    RequiredValuesDialog,
    NewNpcDialog,
    NewNpcTemplateDialog,
    ManageNpcTemplatesDialog,
    EditNpcTemplateDialog,
    ConfirmDialog,
    ActionItemFilterPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DragulaModule.forRoot(),
    FlexLayoutModule,
    FontAwesomeModule,
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
