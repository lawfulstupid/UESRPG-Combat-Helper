import { Component, Input } from "@angular/core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-foldable-section',
  templateUrl: 'foldable-section.component.html',
  styleUrls: ['foldable-section.component.scss']
})
export class FoldableSectionComponent {
  
  readonly openIcon = faChevronDown;
  readonly closeIcon = faChevronUp;
  
  @Input('openByDefault')
  set openByDefault(open: boolean) {
    this.open = open;
  }
  
  @Input()
  title?: string;
  
  @Input()
  maxHeight: string = '100%';
  
  open: boolean = true;
  
}