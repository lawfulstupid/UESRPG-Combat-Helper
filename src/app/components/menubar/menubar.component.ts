import { Component } from "@angular/core";
import { NewNpcDialog } from "src/app/dialog/new-npc/new-npc.dialog";
import { StaticProvider } from "src/app/static.provider";

@Component({
  selector: 'app-toolbar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  
  newNpc() {
    StaticProvider.dialog.open(NewNpcDialog, {}).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
  newNpcTemplate() {
    // TODO
  }
  
}