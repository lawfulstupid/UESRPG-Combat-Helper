import { Component, ComponentRef, OnInit, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Npc } from "src/app/model/character/npc";
import { EventManager } from "src/app/service/event.manager";
import { NpcComponent } from "../npc/npc.component";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  
  public static instance: WorkspaceComponent;
  
  @ViewChildren('insertionPoint', {read: ViewContainerRef})
  containers!: QueryList<ViewContainerRef>;
  
  componentRefs: Array<ComponentRef<NpcComponent>> = [];
  
  constructor(
    private dragulaService: DragulaService 
  ) {
    WorkspaceComponent.instance = this;
    
    this.dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
    
    EventManager.addNpcEvent.subscribe(this.addNpc.bind(this));
    EventManager.removeNpcEvent.subscribe(this.removeNpcEvent.bind(this));
  }
  
  ngOnInit() {
    // Fix column width to be integer pixel
    const list = Array.from(document.getElementsByClassName('drag-column'));
    for (let elm of list) {
      const realElm = <HTMLElement>elm;
      realElm.style.width = Math.floor(elm.clientWidth / list.length) + 'px';
    }
  }
  
  private addNpc(npc: Npc) {
    const component = this.containers.first.createComponent(NpcComponent);
    this.componentRefs.push(component);
    component.instance.npc = npc;
  }
  
  private removeNpcEvent(npc: Npc) {
    const idx = this.componentRefs.findIndex(componentRef => componentRef.instance.npc === npc);
    const componentRef = this.componentRefs.splice(idx)[0];
    componentRef.destroy();
  }
  
}