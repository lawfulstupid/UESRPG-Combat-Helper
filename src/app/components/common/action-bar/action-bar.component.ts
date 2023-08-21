import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-actionbar',
  templateUrl: 'action-bar.component.html',
  styleUrls: ['action-bar.component.scss']
})
export class ActionbarComponent {
  
  @ViewChild("actionbar", {read: ElementRef, static: true})
  elementRef?: ElementRef;
  
  @Input()
  actions: Array<ActionItem> = [];
  
  @Input()
  callbackParam?: any;
  
  get scrollpos(): number {
    if (!this.elementRef) return 0.5;
    const elm: Element = this.elementRef.nativeElement;
    return elm.scrollLeft / (elm.scrollWidth - elm.clientWidth);
  }
  
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