import { Component, Input } from "@angular/core";
import { ActionItem } from "../components/actionbar/actionbar.component";

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {
  
  @Input('title')
  title: string = '';
  
  @Input('width')
  width: string = '30vw';
  
  @Input('min-height')
  minHeight: string = 'auto';
  
  @Input('max-height')
  maxHeight: string = '80vh';
  
  @Input('actions')
  actions: Array<ActionItem> = [];
  
  @Input('cancel')
  cancelButton?: string;
  
}