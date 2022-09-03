import {Component} from "@angular/core";
import {NpcTemplateRepository} from "src/app/dao/npc-template.repository";
import {Lookup} from "src/app/model/lookup";
import {NpcTemplate} from "src/app/model/npc-template";
import {MatDialog} from '@angular/material/dialog';
import {TestDialog} from '../../dialog/test/test.dialog';

@Component({
  selector: 'npc',
  templateUrl: 'npc.component.html'
})
export class NpcComponent {
  
  template: NpcTemplate = new NpcTemplate('');
  
  lookups: Array<Lookup> = [];
  
  constructor(
    private npcTemplateRepo: NpcTemplateRepository,
    private dialog: MatDialog
  ) {}
  
  save() {
    this.npcTemplateRepo.save(this.template);
  }
  
  retrieve() {
    this.template = this.npcTemplateRepo.retrieve(this.template.code);
  }
  
  listKeys() {
    this.lookups = this.npcTemplateRepo.getLookups();
    console.log(this.lookups);
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