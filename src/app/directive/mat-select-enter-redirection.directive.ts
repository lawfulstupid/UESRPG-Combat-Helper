import { Directive, EventEmitter, Output, Self } from "@angular/core";
import { MatSelect } from "@angular/material/select";

@Directive({
  selector: 'mat-select'
})
export class MatSelectEnterRedirectionDirective {
  
  @Output()
  onEnterPressed: EventEmitter<void> = new EventEmitter();
  
  constructor(@Self() select: MatSelect) {
    const defaultSelectHandler = select._handleKeydown;
    select._handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (select.panelOpen) {
          defaultSelectHandler.bind(select)(event);
        } else {
          this.onEnterPressed.emit();
        }
      } else {
        defaultSelectHandler.bind(select)(event);
      }
    }
  }
  
}