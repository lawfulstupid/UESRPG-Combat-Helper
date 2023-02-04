import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-long-press-button',
  templateUrl: './long-press-button.component.html'
})
export class LongPressButtonComponent {
  
  private static readonly LONG_PRESS_DURATION_MS = 500;
  
  @Input()
  disabled: boolean = false;
  
  @Output()
  shortPress: EventEmitter<void> = new EventEmitter();
  
  @Output()
  longPress: EventEmitter<void> = new EventEmitter();
  
  longPressTimeout?: NodeJS.Timeout;
  depressed: boolean = false; // is button currently being clicked?

  onMouseDown() {
    if (this.disabled) return;
    this.depressed = true;
    this.longPressTimeout = setTimeout(() => { // this callback happens on long press
      if (this.depressed) {     // if button is still being held down (not released by leaving)
        this.depressed = false; // release button
        this.longPress.emit();  // emit long press
      }
    }, LongPressButtonComponent.LONG_PRESS_DURATION_MS);
  }
  
  onMouseUp() {
    if (this.disabled) return;
    clearTimeout(this.longPressTimeout); // prevent long press from firing
    if (this.depressed) {     // if button still being held down (not released by long press or leaving)
      this.shortPress.emit(); // emit a short press
    }
    this.depressed = false;   // release button either way
  }
  
  onMouseLeave() {
    if (this.disabled) return;
    clearTimeout(this.longPressTimeout);  // prevent long press from firing
    this.depressed = false;               // release button
  }
  
}
