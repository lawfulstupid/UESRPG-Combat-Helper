import { Pipe, PipeTransform } from "@angular/core";
import { ActionItem } from "../components/actionbar/actionbar.component";

@Pipe({
  name: 'actionItemFilter',
  pure: false
})
export class ActionItemFilterPipe implements PipeTransform {
  
  transform(actions: Array<ActionItem>): Array<ActionItem> {
    return actions.filter(action => !(action.isHidden && action.isHidden()));
  }
  
}