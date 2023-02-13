import { Component } from "@angular/core";

@Component({
  selector: 'app-pixel-rounder',
  template: '',
  styles: [':host { display: block; }']
})
export class PixelRounderComponent {
  
  /* The jankest wank */
  
  constructor () {
    PixelRounderComponent.init();
  }
  
  private static readonly REFRESH_RATE = 100; // increase if laggy lol
  private static loop?: NodeJS.Timer;
  
  // Sets up the pixel-rounder control loop
  private static init() {
    if (this.loop !== undefined) return;
    this.loop = setInterval(this.update.bind(this), this.REFRESH_RATE);
  }
  
  // Finds all pixel-rounders and sets their height so that their bottom is at an integer number of pixels
  private static update() {
    const list = <Array<HTMLElement>>Array.from(document.getElementsByTagName('app-pixel-rounder'));
    for (const elm of list) {
      const yPos = elm.getBoundingClientRect().y;
      const yDiff = Math.ceil(yPos) - yPos;
      elm.style.height = yDiff + 'px';
    }
  }
  
}