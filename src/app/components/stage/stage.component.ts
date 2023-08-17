import { Component, ComponentRef, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { DragulaService } from "ng2-dragula";
import { EMPTY, Observable, mergeMap, of } from "rxjs";
import { ConfirmDialog } from "src/app/dialog/confirm/confirm.dialog";
import { Npc } from "src/app/model/character/npc";
import { Session } from "src/app/model/session";
import { EventManager } from "src/app/service/event.manager";
import { SessionManager } from "src/app/service/session.manager";
import { StaticProvider } from "src/app/service/static.provider";
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
  
  static readonly MIN_COLUMN_WIDTH_PX = 280;
  static readonly MAX_COLUMN_WIDTH_PX = 500;
  canAddColumns = true;
  canRemoveColumns = true;
  numColumns = 4;
  
  @ViewChildren('insertionPoint', {read: ViewContainerRef})
  containers!: QueryList<ViewContainerRef>;
  
  componentRefs: Array<ComponentRef<NpcComponent>> = [];
  
  constructor(
    private dragulaService: DragulaService 
  ) {
    StageComponent.instance = this;
    
    this.dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
    
    EventManager.addNpcEvent.subscribe(this.addNpc.bind(this));
    EventManager.removeNpcEvent.subscribe(this.removeNpcEvent.bind(this));
    EventManager.saveSessionEvent.subscribe(this.saveSession.bind(this));
    EventManager.loadSessionEvent.subscribe(this.loadSession.bind(this));
  }
  
  ngOnInit() {
    this.setColumnWidths();
    addEventListener("resize", this.setColumnWidths.bind(this));
  }
  
  private setColumnWidths() {
    setTimeout(() => {
      // Fix column width to be integer pixel
      const list = Array.from(document.getElementsByClassName('drag-column'));
      const width = Math.floor(window.innerWidth / this.numColumns);
      for (let elm of list) {
        const realElm = <HTMLElement>elm;
        realElm.style.width = '' + width + 'px';
      }
      
      // Check if columns are too narrow, try to remove
      if (width < StageComponent.MIN_COLUMN_WIDTH_PX) {
        this.removeColumn(this.numColumns - 1);
      } else if (width > StageComponent.MAX_COLUMN_WIDTH_PX) {
        this.addColumn();
      }
      
      // Update controls
      this.canAddColumns = Math.floor(window.innerWidth / (this.numColumns + 1)) >= StageComponent.MIN_COLUMN_WIDTH_PX;
      this.canRemoveColumns = Math.floor(window.innerWidth / (this.numColumns - 1)) <= StageComponent.MAX_COLUMN_WIDTH_PX;
    }, 0);
  }
  
  private addNpc(npc: Npc, column?: number) {
    // Get emptiest column if no column supplied
    if (column === undefined) {
      column = 0; // backup value
      let smallestSize = Number.MAX_SAFE_INTEGER;
      for (let idx = 0; idx < this.containers.length; idx++) {
        const currentSize = this.containers.get(idx)!.length
        if (currentSize < smallestSize) {
          column = idx;
          smallestSize = currentSize;
        }
      }
    }
    
    const component = this.containers.get(column)!.createComponent(NpcComponent);
    this.componentRefs.push(component);
    component.instance.npc = npc;
  }
  
  private removeNpcEvent(npc: Npc) {
    const idx = this.componentRefs.findIndex(componentRef => componentRef.instance.npc === npc);
    const componentRef = this.componentRefs.splice(idx, 1)[0];
    componentRef.destroy();
  }
  
  // Attempts to delete all NPCs and returns an observable value to indicate whether it succeeded
  private clearStage(): Observable<void> {
    // If there are no NPCs, no action required
    if (this.componentRefs.length === 0) return of(undefined);
    
    // There are NPCs on the stage -- get confirmation from user to clear
    const config: MatDialogConfig = {data:{
      title: 'Clear Stage',
      message: 'This will delete existing NPCs. Are you sure?',
      yesButton: 'Proceed',
      noButton: 'Cancel'
    }};
    
    // open confirmation dialog
    return StaticProvider.dialog.open(ConfirmDialog, config).afterClosed().pipe(mergeMap(response => {
      if (response) {
        // perform the stage clear if response was affirmative
        this.componentRefs.forEach(ref => {
          ref.destroy();
        });
        this.componentRefs = [];
        return of(undefined);
      } else {
        // do not fire subscribers if response was negative
        return EMPTY;
      }
    }));
  }
  
  private saveSession(sessionName: string) {
    const stage: Array<Array<Npc>> = [];
    for (let elmDragColumn of Array.from(document.getElementsByClassName('drag-column'))) {
      const column: Array<Npc> = [];
      for (let elmNpc of Array.from(elmDragColumn.querySelectorAll('app-npc'))) {
        const npc = this.componentRefs.find(ref => ref.location.nativeElement === elmNpc)!.instance.npc;
        column.push(npc);
      }
      stage.push(column);
    }

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
    this.numColumns++;
    this.setColumnWidths();
  }
  
  removeColumn(idx: number) {
    // Only last column can be removed
    if (idx !== this.numColumns - 1) {
      console.log('Cannot remove column ' + idx);
      return;
    }
    
    // Only empty columns can be removed
    const columns = Array.from(document.getElementsByClassName('drag-column'))
    const lastColumn = columns[columns.length - 1];
    const numNpcs = lastColumn.querySelectorAll('app-npc').length;
    if (numNpcs !== 0) {
      console.log('Cannot remove non-empty column');
      return;
    }
    
    this.numColumns--;
    this.setColumnWidths();
  }
  
  private setColumns(num: number) {
    if (num > this.numColumns) {
      this.numColumns = num;
      this.setColumnWidths();
    } else while (num < this.numColumns) {
      this.removeColumn(this.numColumns - 1);
    }
  }
  
}