import { Component } from "@angular/core";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { StaticProvider } from "src/app/static.provider";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  
  newNpc() {
    StaticProvider.dialog.open(NewNpcDialog, {}).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
  newNpcTemplate() {
    // TODO
  }
  
}