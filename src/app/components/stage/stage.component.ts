import { Component, ComponentRef, EventEmitter, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Observable } from "rxjs";
import { Npc } from "src/app/model/character/npc";
import { SerialNpc } from "src/app/model/stage/serial-npc";
import { EventManager } from "src/app/service/event.manager";
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
  
  // Delete all NPCs
  private clearStage() {
    // TODO: display a warning if componentRefs is not empty
    this.componentRefs.forEach(ref => {
      ref.destroy();
    });
    this.componentRefs = [];
  }
  
  private exportStage() {
    const stage: Array<Array<SerialNpc>> = [];
    for (let elmDragColumn of Array.from(document.getElementsByClassName('drag-column'))) {
      const column: Array<SerialNpc> = [];
      for (let elmNpc of Array.from(elmDragColumn.querySelectorAll('app-npc'))) {
        const npc = this.componentRefs.find(ref => ref.location.nativeElement === elmNpc)!.instance.npc;
        column.push(new SerialNpc(npc));
      }
      stage.push(column);
    }
    this.download(stage, 'stage-' + new Date().toISOString().slice(0,-5) + '.json');
  }
  
  private importStage() {
    this.upload<Array<Array<SerialNpc>>>().subscribe(stage => {
      this.clearStage();
      for (let columnIdx = 0; columnIdx < stage.length; columnIdx++) {
        for (let npc of stage[columnIdx]) {
          this.addNpc(SerialNpc.toNpc(npc), columnIdx);
        }
      }
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
        tempEvent.emit(JSON.parse(text));
      });
    };
    link.click();
    link.remove();
    return tempEvent;
  }
  
}