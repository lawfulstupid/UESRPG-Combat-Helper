import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-long-press-button',
  templateUrl: './long-press-button.component.html'
})
export class LongPressButtonComponent {
  
  private static readonly LONG_PRESS_DURATION_MS = 500;
  
  @Output()
  shortPress: EventEmitter<void> = new EventEmitter();
  
  @Output()
  longPress: EventEmitter<void> = new EventEmitter();
  
  longPressTimeout?: NodeJS.Timeout;
  longPressFired: boolean = false; // tracks if long press has been emitted since last mouse down

  onMouseDown() {
    this.longPressFired = false;
    this.longPressTimeout = setTimeout(() => {  // this callback happens on long press
      if (!this.longPressFired) {               // don't emit if action cancelled by onMouseLeave()
        this.longPressFired = true;
        this.longPress.emit();
      }
    }, LongPressButtonComponent.LONG_PRESS_DURATION_MS);
  }
  
  onMouseUp() {
    clearTimeout(this.longPressTimeout);
    if (!this.longPressFired) { // if no long press was emitted...
      this.shortPress.emit();   // ...emit a short press
    }
  }
  
  onMouseLeave() {
    clearTimeout(this.longPressTimeout);
    this.longPressFired = true; // prevents emitting any press until next mouse down
  }
  
}
