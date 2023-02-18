import { Component, ComponentRef, EventEmitter, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { DragulaService } from "ng2-dragula";
import { EMPTY, mergeMap, Observable, of } from "rxjs";
import { ConfirmDialog } from "src/app/dialog/confirm/confirm.dialog";
import { Npc } from "src/app/model/character/npc";
import { Persistence } from "src/app/model/serialisation/persistence";
import { EventManager } from "src/app/service/event.manager";
import { StaticProvider } from "src/app/service/static.provider";
import { ErrorComponent } from "../error/error.component";
import { NpcComponent } from "../npc/npc.component";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {
  
  public static instance: StageComponent;
  
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
    EventManager.exportStageEvent.subscribe(this.exportStage.bind(this));
    EventManager.importStageEvent.subscribe(this.importStage.bind(this));
  }
  
  ngOnInit() {
    // Fix column width to be integer pixel
    const list = Array.from(document.getElementsByClassName('drag-column'));
    for (let elm of list) {
      const realElm = <HTMLElement>elm;
      realElm.style.width = Math.floor(elm.clientWidth / list.length) + 'px';
    }
  }
  
  private addNpc(npc: Npc, column: number = 0) {
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
  
  private exportStage() {
    const stage: Array<Array<any>> = [];
    for (let elmDragColumn of Array.from(document.getElementsByClassName('drag-column'))) {
      const column: Array<any> = [];
      for (let elmNpc of Array.from(elmDragColumn.querySelectorAll('app-npc'))) {
        const npc = this.componentRefs.find(ref => ref.location.nativeElement === elmNpc)!.instance.npc;
        column.push(Persistence.simplify(npc));
      }
      stage.push(column);
    }
    this.download(stage, 'stage-' + new Date().toISOString().slice(0,-5) + '.json');
  }
  
  private importStage() {
    this.upload<Array<Array<any>>>().subscribe(stage => {
      this.clearStage().subscribe(() => {
        for (let columnIdx = 0; columnIdx < stage.length; columnIdx++) {
          for (let npc of stage[columnIdx]) {
            this.addNpc(Persistence.desimplify(npc), columnIdx);
          }
        }
      });
    });
  }
  
  private download(data: any, filename: string) {
    const blob = new Blob([JSON.stringify(data)], {type: 'text/json'});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();
  }
  
  private upload<T>(): Observable<T> {
    const tempEvent: EventEmitter<T> = new EventEmitter();
    const link = document.createElement('input');
    link.type = 'file';
    link.accept = '.json';
    link.onchange = () => {
      link.files?.item(0)?.text().then(text => {
        try {
          tempEvent.emit(JSON.parse(text));
        } catch (e) {
          ErrorComponent.error('Failed to parse file');
          throw e;
        }
      });
    };
    link.click();
    link.remove();
    return tempEvent;
  }
  
}