import { Component, ComponentFactoryResolver, QueryList, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Npc } from "src/app/model/npc";
import { EventService } from "src/app/service/event.service";
import { NpcManager } from "src/app/service/npc.manager";
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
    private dragulaService: DragulaService,
    private eventService: EventService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
    
    eventService.addNpcEvent.subscribe(this.addNpc.bind(this));
  }
  
  private addNpc(templateKey: string) {
    const npc: Npc = NpcManager.makeNewNpc(templateKey);
    const component = this.container.createComponent(NpcComponent);
    component.setInput('npc', npc);
  }
  
}