import { Pipe, PipeTransform } from "@angular/core";
import { ActionItem } from "../components/action-bar/action-bar.component";

@Pipe({
  name: 'actionItemFilter',
  pure: false
})
export class ActionItemFilterPipe implements PipeTransform {
  
  transform(actions: Array<ActionItem>): Array<ActionItem> {
    return actions.filter(action => !(action.isHidden && action.isHidden()));
  }
  
}