import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragulaModule } from 'ng2-dragula';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppComponent } from './app.component';
import { ActionbarComponent } from './components/common/action-bar/action-bar.component';
import { FoldableSectionComponent } from './components/common/foldable-section/foldable-section.component';
import { LongPressButtonComponent } from './components/common/long-press-button/long-press-button.component';
import { PixelRounderComponent } from './components/common/pixel-rounder/pixel-rounder.component';
import { MultiPropertyInputComponent } from './components/common/property-input/multi-property-input/multi-property-input.component';
import { PropertyInputComponent } from './components/common/property-input/property-input.component';
import { TestResultComponent } from './components/common/test-result/test-result.component';
import { ErrorComponent } from './components/error/error.component';
import { LogComponent } from './components/log/log.component';
import { MenubarComponent } from './components/menu-bar/menu-bar.component';
import { AttributeBarComponent } from './components/npc/attribute-bar/attribute-bar.component';
import { NpcComponent } from './components/npc/npc.component';
import { SkillRollerComponent } from './components/npc/skill-roller/skill-roller.component';
import { WoundsComponent } from './components/npc/wounds/wounds.component';
import { StageComponent } from './components/stage/stage.component';
import { ConfirmDialog } from './dialog/confirm/confirm.dialog';
import { Dialog } from './dialog/dialog';
import { EditDataCharacterDialog } from './dialog/edit-data-character/edit-data-character.dialog';
import { InfoDialog } from './dialog/info/info.dialog';
import { ManageNpcTemplatesDialog } from './dialog/manage-npc-templates/manage-npc-templates.dialog';
import { ManageSessionsDialog } from './dialog/manage-sessions/manage-sessions.dialog';
import { NewNpcTemplateDialog } from './dialog/new-npc-template/new-npc-template.dialog';
import { NewNpcDialog } from './dialog/new-npc/new-npc.dialog';
import { RequiredValuesDialog } from './dialog/required-values/required-values.dialog';
import { ValueRequestDialog } from './dialog/value-request/value-request.dialog';
import { InputEnterRedirectionDirective } from './directive/input-enter-redirection.directive';
import { MatSelectEnterRedirectionDirective } from './directive/mat-select-enter-redirection.directive';
import { ActionItemFilterPipe } from './pipe/action-item-filter.pipe';
import { AsyncDefaultPipe } from './pipe/async-default.pipe';
import { RangePipe } from './pipe/range.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    StageComponent,
    ErrorComponent,
    ActionbarComponent,
    NpcComponent,
    PropertyInputComponent,
    MultiPropertyInputComponent,
    AttributeBarComponent,
    LongPressButtonComponent,
    SkillRollerComponent,
    PixelRounderComponent,
    LogComponent,
    TestResultComponent,
    WoundsComponent,
    FoldableSectionComponent,
    Dialog,
    ValueRequestDialog,
    RequiredValuesDialog,
    NewNpcDialog,
    NewNpcTemplateDialog,
    ManageNpcTemplatesDialog,
    ManageSessionsDialog,
    EditDataCharacterDialog,
    ConfirmDialog,
    InfoDialog,
    ActionItemFilterPipe,
    RangePipe,
    AsyncDefaultPipe,
    InputEnterRedirectionDirective,
    MatSelectEnterRedirectionDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DragulaModule.forRoot(),
    FlexLayoutModule,
    FontAwesomeModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatSidenavModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
