import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Npc } from "src/app/model/npc";
import { EventManager } from "src/app/service/event.manager";
import { NpcComponent } from "../npc/npc.component";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  
  @ViewChild('insertionPoint', {read: ViewContainerRef})
  container!: ViewContainerRef;
  
  constructor(
    private dragulaService: DragulaService 
  ) {
    this.dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
    
    EventManager.addNpcEvent.subscribe(this.addNpc.bind(this));
  }
  
  private addNpc(npc: Npc) {
    this.container.createComponent(NpcComponent).setInput('npc', npc);
  }
  
}