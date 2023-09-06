import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { faDownload, faHandPointer, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ActionItem } from "src/app/components/common/action-bar/action-bar.component";
import { Identifier } from "src/app/model/identifier";
import { TemplateRole } from "src/app/model/property/abstract/property";
import { TextProperty } from "src/app/model/property/types/text.property";
import { Session } from "src/app/model/session";
import { EventManager } from "src/app/service/event.manager";
import { SessionManager } from "src/app/service/session.manager";
import { FileUtil } from "src/app/util/file.util";
import { Dialog } from "../dialog";
import { ValueRequestDialog } from "../value-request/value-request.dialog";

@Component({
  templateUrl: 'manage-sessions.dialog.html',
  styleUrls: ['../dialog.scss']
})
export class ManageSessionsDialog extends Dialog<ManageSessionsDialog, void, void> {
  
  private static readonly NAME_PROP = new TextProperty('sessionName', 'Session Name', TemplateRole.NO_TEMPLATE);
  
  override actions: Array<ActionItem> = [{
    label: 'Save',
    callback: this.saveSession.bind(this)
  }, {
    label: 'Import',
    callback: this.importSession.bind(this)
  }, {
    label: 'Export All',
    callback: this.exportAllSessions.bind(this)
  }];
  
  rowActions: Array<ActionItem> = [{
    icon: faHandPointer,
    label: 'Load',
    callback: this.loadSession.bind(this)
  }, {
    icon: faPencil,
    label: 'Rename',
    callback: this.renameSession.bind(this)
  }, {
    icon: faTrash,
    label: 'Delete',
    callback: this.deleteSession.bind(this)
  }, {
    icon: faDownload,
    label: 'Export',
    callback: this.exportSession.bind(this)
  }];
  
  sessionList: Array<Identifier> = [];
  
  constructor(dialogRef: MatDialogRef<ManageSessionsDialog>) {
    super(dialogRef);
    this.loadSessionList();
    EventManager.reloadSessionListEvent.subscribe(() => {
      this.loadSessionList();
    });
  }
  
  loadSessionList() {
    this.sessionList = SessionManager.list().sort((a,b) => b.key.localeCompare(a.key));
  }
  
  saveSession() {
    ValueRequestDialog.requestValue(ManageSessionsDialog.NAME_PROP).subscribe(name => {
      EventManager.saveSessionEvent.emit(name);
    });
  }
  
  loadSession(sessionKey: string) {
    EventManager.loadSessionEvent.emit(sessionKey);
    this.dialogRef.close();
  }
  
  renameSession(sessionKey: string) {
    ValueRequestDialog.requestValue(ManageSessionsDialog.NAME_PROP).subscribe(name => {
      const session = SessionManager.load(sessionKey);
      session.name = name;
      SessionManager.update(session);
      this.loadSessionList();
    });
  }
  
  deleteSession(sessionKey: string) {
    SessionManager.delete(sessionKey);
    this.loadSessionList();
  }
  
  exportSession(sessionKey: string) {
    const session: Session = SessionManager.load(sessionKey);
    FileUtil.download(SessionManager.instance.serialise(session), session.name + '.json');
  }
  
  exportAllSessions() {
    this.sessionList.forEach(id => {
      const session: Session = SessionManager.load(id.key);
      FileUtil.zip(SessionManager.instance.serialise(session), id.key + '.json');
    });
    FileUtil.downloadZip('sessions.zip');
  }
  
  importSession() {
    FileUtil.uploadMany<string>().subscribe(sessionStrs => {
      sessionStrs.forEach(sessionStr => {
        const session: Session = SessionManager.instance.deserialise(sessionStr);
        SessionManager.create(session);
      });
      this.loadSessionList();
    });
  }
  
}