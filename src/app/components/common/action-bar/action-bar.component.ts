import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-actionbar',
  templateUrl: 'action-bar.component.html',
  styleUrls: ['action-bar.component.scss']
})
export class ActionbarComponent {
  
  @Input()
  actions: Array<ActionItem> = [];
  
  @Input()
  callbackParam?: any;
  
  doCallback(action: ActionItem) {
    if (this.callbackParam === undefined) {
      action.callback();
    } else {
      action.callback(this.callbackParam);
    }
  }
  
}

export interface ActionItem {
  label: string;
  callback: Function;
  separator?: boolean;
  isDisabled?: () => boolean;
  isHidden?: () => boolean;
}