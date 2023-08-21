import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

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
    if (action.callback) {
      if (this.callbackParam === undefined) {
        action.callback();
      } else {
        action.callback(this.callbackParam);
      }
    }
  }
  
}

export interface ActionItem {
  label: string | number;
  icon?: IconDefinition;
  callback?: Function;
  separator?: boolean;
  plaintext?: boolean;
  isDisabled?: () => boolean;
  isHidden?: () => boolean;
}