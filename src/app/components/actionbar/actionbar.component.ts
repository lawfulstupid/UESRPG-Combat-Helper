import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-actionbar',
  templateUrl: 'actionbar.component.html',
  styleUrls: ['actionbar.component.scss']
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
  isDisabled?: () => boolean;
  isHidden?: () => boolean;
}