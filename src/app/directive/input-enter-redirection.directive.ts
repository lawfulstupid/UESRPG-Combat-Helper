import { Directive, EventEmitter, HostListener, Output } from "@angular/core";

@Directive({
  selector: 'input'
})
export class InputEnterRedirectionDirective {
  
  @Output()
  onEnterPressed: EventEmitter<void> = new EventEmitter();
  
  constructor() {}
  
  @HostListener('keypress', ['$event'])
  onKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onEnterPressed.emit();
    }
  }
  
}