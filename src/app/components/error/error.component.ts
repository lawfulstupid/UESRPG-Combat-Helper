import { Component } from "@angular/core";

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.scss']
})
export class ErrorComponent {
  
  static instance: ErrorComponent;
  
  queue: Array<ErrorMessage> = [];
  
  constructor() {
    ErrorComponent.instance = this;
  }
  
  static error(msg: string): Error {
    this.instance.queue.push(new ErrorMessage(msg));
    return new Error(msg);
  }
  
}

class ErrorMessage {
  
  private static readonly MESSAGE_TIMEOUT_MS = 4000;
  private static readonly FADEOUT_TIME_MS = 1000;
  
  fading: boolean = false;
  timeout?: NodeJS.Timeout;
  
  constructor(readonly message: string) {
    this.startTimer();
  }
  
  startTimer() {
    this.timeout = setTimeout(() => {
      this.beginFadeOut();
    }, ErrorMessage.MESSAGE_TIMEOUT_MS);
  }
  
  stopTimer() {
    clearTimeout(this.timeout);
    this.fading = false;
  }
  
  private beginFadeOut() {
    this.fading = true;
    this.timeout = setTimeout(() => {
      this.destroy();
    }, ErrorMessage.FADEOUT_TIME_MS);
  }
  
  private destroy() {
    let idx = ErrorComponent.instance.queue.findIndex(error => error === this);
    ErrorComponent.instance.queue.splice(idx, 1);
  }
  
}