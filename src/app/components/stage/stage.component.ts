import { Component, ComponentRef, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragulaService } from "ng2-dragula";
import { EMPTY, Observable, mergeMap, of } from "rxjs";
import { ConfirmDialog, ConfirmDialogConfig } from "src/app/dialog/confirm/confirm.dialog";
import { Npc } from "src/app/model/character/npc";
import { Session } from "src/app/model/session";
import { EventManager } from "src/app/service/event.manager";
import { SessionManager } from "src/app/service/session.manager";
import { DialogUtil } from "src/app/util/dialog.util";
import { NpcComponent } from "../npc/npc.component";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  
  public static instance: StageComponent;
  readonly faPlus = faPlus;
  readonly faMinus = faMinus;
  
  columns: Array<Array<ComponentRef<NpcComponent>>> = Array(4);
  static readonly MIN_COLUMN_WIDTH_PX = 280;
  static readonly MAX_COLUMN_WIDTH_PX = 500;
  canAddColumns = true;
  canRemoveColumns = true;
  
  @ViewChildren('insertionPoint', {read: ViewContainerRef})
  insertionPoints!: QueryList<ViewContainerRef>;
  
  constructor(
    private dragulaService: DragulaService 
  ) {
    StageComponent.instance = this;
    this.initColumns();
    
    this.dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
    
    // Moves ComponentRefs within this.columns
    this.dragulaService.dropModel().subscribe(({source, target, sourceIndex, targetIndex}) => {
      const srcColIdx = Number.parseInt(source.id.replace('drag-column-', ''));
      const tgtColIdx = Number.parseInt(target.id.replace('drag-column-', ''));
      const srcRowIdx = sourceIndex - 1;
      const tgtRowIdx = targetIndex - 1;
      const ref = this.columns[srcColIdx].splice(srcRowIdx, 1)[0];
      this.columns[tgtColIdx].splice(tgtRowIdx, 0, ref);
    });
    
    EventManager.addNpcEvent.subscribe(this.addNpc.bind(this));
    EventManager.removeNpcEvent.subscribe(this.removeNpcEvent.bind(this));
    EventManager.saveSessionEvent.subscribe(this.saveSession.bind(this));
    EventManager.loadSessionEvent.subscribe(this.loadSession.bind(this));
  }
  
  private initColumns() {
    for (let i = 0; i < this.columns.length; i++) {
      this.columns[i] = [];
    }
  }
  
  ngOnInit() {
    this.setColumnWidths();
    addEventListener("resize", this.setColumnWidths.bind(this));
  }
  
  private setColumnWidths() {
    setTimeout(() => {
      // Fix column width to be integer pixel
      const list = Array.from(document.getElementsByClassName('drag-column'));
      const width = Math.floor(window.innerWidth / this.columns.length);
      for (let elm of list) {
        const realElm = <HTMLElement>elm;
        realElm.style.width = '' + width + 'px';
      }
      
      // Check if columns are too narrow, try to remove
      if (width < StageComponent.MIN_COLUMN_WIDTH_PX) {
        this.removeColumn(this.columns.length - 1);
      } else if (width > StageComponent.MAX_COLUMN_WIDTH_PX) {
        this.addColumn();
      }
      
      // Update controls
      this.canAddColumns = Math.floor(window.innerWidth / (this.columns.length + 1)) >= StageComponent.MIN_COLUMN_WIDTH_PX;
      this.canRemoveColumns = Math.floor(window.innerWidth / (this.columns.length - 1)) <= StageComponent.MAX_COLUMN_WIDTH_PX;
    }, 0);
  }
  
  private addNpc(npc: Npc, column?: number) {
    // Get emptiest column if no column supplied
    if (column === undefined) {
      column = 0; // backup value
      let smallestSize = Number.MAX_SAFE_INTEGER;
      for (let idx = 0; idx < this.columns.length; idx++) {
        const currentSize = this.columns[idx].length
        if (currentSize < smallestSize) {
          column = idx;
          smallestSize = currentSize;
        }
      }
    }
    
    const component: ComponentRef<NpcComponent> = this.insertionPoints.get(column)!.createComponent(NpcComponent);
    this.columns[column].push(component)
    component.instance.npc = npc;
  }
  
  private removeNpcEvent(npc: Npc) {
    for (let column of this.columns) {
      const idx = column.findIndex(componentRef => componentRef.instance.npc === npc);
      if (idx !== -1) {
        const componentRef = column.splice(idx, 1)[0];
        componentRef.destroy();
      }
    }
  }
  
  // Attempts to delete all NPCs and returns an observable value to indicate whether it succeeded
  private clearStage(): Observable<void> {
    // If there are no NPCs, no action required
    if (this.columns.every(column => column.length === 0)) return of(undefined);
    
    // There are NPCs on the stage -- get confirmation from user to clear
    const data: ConfirmDialogConfig = {
      title: 'Clear Stage',
      message: 'This will delete existing NPCs. Are you sure?',
      yesButton: 'Proceed',
      noButton: 'Cancel'
    };
    
    // open confirmation dialog
    return DialogUtil.open(ConfirmDialog, data).pipe(mergeMap(response => {
      if (response) {
        // perform the stage clear if response was affirmative
        this.columns.forEach(column => {
          column.forEach(ref => {
            ref.destroy();
          });
        });
        this.initColumns();
        return of(undefined);
      } else {
        // do not fire subscribers if response was negative
        return EMPTY;
      }
    }));
  }
  
  private saveSession(sessionName: string) {
    const stage: Array<Array<Npc>> = this.columns.map(column => column.map(ref => ref.instance.npc));
    SessionManager.create(new Session(sessionName, stage));
    EventManager.reloadSessionListEvent.emit();
  }
  
  private loadSession(sessionKey: string) {
    const session: Session = SessionManager.load(sessionKey);
    const stage = session.stage;
    this.clearStage().subscribe(() => {
      this.setColumns(stage.length); // set number of columns on stage import
      for (let columnIdx = 0; columnIdx < stage.length; columnIdx++) {
        for (let npc of stage[columnIdx]) {
          this.addNpc(npc, columnIdx);
        }
      }
    });
  }
  
  addColumn() {
    this.columns.push([]);
    this.setColumnWidths();
  }
  
  removeColumn(idx: number) {
    // Only last column can be removed
    if (idx !== this.columns.length - 1) {
      return;
    }
    
    // Only empty columns can be removed
    const columns = Array.from(document.getElementsByClassName('drag-column'))
    const lastColumn = columns[columns.length - 1];
    const numNpcs = lastColumn.querySelectorAll('app-npc').length;
    if (numNpcs !== 0) {
      return;
    }
    
    this.columns.splice(this.columns.length - 1, 1);
    this.setColumnWidths();
  }
  
  private setColumns(num: number) {
    while (num > this.columns.length) this.addColumn();
    while (num < this.columns.length) this.removeColumn(this.columns.length - 1);
  }
  
}