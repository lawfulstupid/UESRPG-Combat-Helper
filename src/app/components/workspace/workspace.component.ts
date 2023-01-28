import { Component } from "@angular/core";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  
  constructor(
    private dragulaService: DragulaService
  ) {
    dragulaService.createGroup("DRAGGABLE", {
      revertOnSpill: true,
      moves: (_el, _container, handle) => {
        return (<Element>handle).className === 'drag-handle';
      }
    });
  }
  
}