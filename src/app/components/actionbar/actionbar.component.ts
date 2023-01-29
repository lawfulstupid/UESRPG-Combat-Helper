import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-actionbar',
  templateUrl: 'actionbar.component.html',
  styleUrls: ['actionbar.component.scss']
})
export class ActionbarComponent {
  
  @Input()
  actions: Array<ActionItem> = [];
  
}

export interface ActionItem {
  label: string;
  callback: () => void;
  isDisabled?: () => boolean;
  isHidden?: () => boolean;
}