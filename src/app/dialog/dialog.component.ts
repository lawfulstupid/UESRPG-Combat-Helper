import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActionItem } from "../components/actionbar/actionbar.component";

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent<T> {
  
  @Input('title')
  title: string = '';
  
  @Input('width')
  width: string = 'auto';
  
  @Input('min-height')
  minHeight: string = 'auto';
  
  @Input('max-height')
  maxHeight: string = '80vh';
  
  @Input('actions')
  actions: Array<ActionItem> = [];
  
  @Input('cancel')
  cancelButton?: string;
  
  @Input('cancelValue')
  cancelValue: any = undefined;
  
  constructor(protected dialogRef: MatDialogRef<T>) {
    this.dialogRef.afterClosed().subscribe(() => {
      this.setFocus();
    });
  }
  
  private setFocus() {
    const list = document.getElementsByTagName('app-dialog');
    list?.item(list.length - 1)?.querySelector('input')?.focus();
  }
  
}