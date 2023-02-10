import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: 'app-wounds',
  templateUrl: 'wounds.component.html',
  styleUrls: ['wounds.component.scss']
})
export class WoundsComponent implements OnInit {
  
  @Input()
  woundEvent!: Subject<number>;
  
  ngOnInit() {
    this.woundEvent.subscribe(loss => {
      console.log(loss);
    });
  }
  
}