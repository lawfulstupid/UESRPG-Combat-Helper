import {Component} from "@angular/core";
import {NpcTemplateService} from '../../service/npc-template.service';
import {Lookup} from "src/app/model/lookup";
import {NpcTemplate} from "src/app/model/npc-template";
import {MatDialog} from '@angular/material/dialog';
import {TestDialog} from '../../dialog/test/test.dialog';

@Component({
  selector: 'npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.scss']
})
export class NpcComponent {
  
  template: NpcTemplate = new NpcTemplate('');
  
  lookups: Array<Lookup> = [];
  
  constructor(
    private npcTemplateService: NpcTemplateService,
    private dialog: MatDialog
  ) {}
  
  save() {
    this.npcTemplateService.updateTemplate(this.template.code);
  }
  
  retrieve() {
    this.template = this.npcTemplateService.getTemplate(this.template.code);
  }
  
  listKeys() {
    this.lookups = this.npcTemplateService.getLookups();
  }

  openDialog() {
    const config = {
      width: '30vw',
      data: {
        content: 'Hello, world!'
      }
    };
    this.dialog.open(TestDialog, config).afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  
}