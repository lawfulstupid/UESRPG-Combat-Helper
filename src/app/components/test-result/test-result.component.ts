import { Component, Input } from "@angular/core";
import { Test } from "src/app/model/test/test";

@Component({
  selector: 'app-test-result',
  templateUrl: 'test-result.component.html',
  styleUrls: ['test-result.component.scss']
})
export class TestResultComponent {
  
  @Input()
  test!: Test;
  
}