import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-long-press-button',
  templateUrl: './long-press-button.component.html'
})
export class LongPressButtonComponent {
  
  private static readonly LONG_PRESS_DURATION_MS = 500;
  private static readonly CTS_PRESS_FREQUENCY_MS = 125;
  
  @Input()
  disabled?: boolean | null = false;
  
  @Input()
  longPressMode: 'once' | 'continuous' = 'once';
  
  @Output()
  shortPress: EventEmitter<void> = new EventEmitter();
  
  @Output()
  longPress: EventEmitter<void> = new EventEmitter();
  
  @Output()
  continuousPress: EventEmitter<void> = new EventEmitter();
  
  longPressTimeout?: NodeJS.Timeout;
  ctsPressInterval?: NodeJS.Timeout;
  depressed: boolean = false; // is button currently being clicked?
  deciding: boolean = false; // are we currently deciding what type of click is happening?

  onMouseDown() {
    if (this.disabled) return;
    this.deciding = true;
    this.depressed = true;
    this.longPressTimeout = setTimeout(() => { // this callback happens on long press
      if (this.deciding) { // if no decision has been made by this point, short press didn't happen
        this.deciding = false;
        if (this.longPressMode === 'once') {
          this.depressed = false; // release button
          this.longPress.emit(); // emit long press
        } else {
          this.ctsPressInterval = setInterval(() => {
            this.continuousPress.emit();
          }, LongPressButtonComponent.CTS_PRESS_FREQUENCY_MS);
        }
      }
    }, LongPressButtonComponent.LONG_PRESS_DURATION_MS);
  }
  
  onMouseUp() {
    if (this.disabled) return;
    clearTimeout(this.longPressTimeout); // prevent long press from firing
    clearTimeout(this.ctsPressInterval); // prevent cts press from firing
    if (this.deciding) { // if mouse released before a decision is made, it must be a short press
      this.shortPress.emit();
    }
    this.depressed = false; // release button either way
  }
  
  onMouseLeave() {
    if (this.disabled) return;
    clearTimeout(this.longPressTimeout); // prevent long press from firing
    clearTimeout(this.ctsPressInterval); // prevent cts press from firing
    this.deciding = false; // stop decision making
    this.depressed = false; // release button
  }
  
}
