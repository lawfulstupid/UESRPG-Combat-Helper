import { AsyncPipe } from "@angular/common";
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { Observable, Subscribable } from "rxjs";

@Pipe({
  name: 'asyncDefault',
  pure: false
})
export class AsyncDefaultPipe implements OnDestroy, PipeTransform {
  
  private asyncInstance: AsyncPipe;
  
  constructor(ref: ChangeDetectorRef) {
    this.asyncInstance = new AsyncPipe(ref);
  }
  
  transform<T>(obj: Observable<T> | Subscribable<T> | Promise<T> | null | undefined, defaultValue: T): T {
    const value = this.asyncInstance.transform(obj);
    return value === null || value === undefined ? defaultValue : value;
  }
  
  ngOnDestroy() {
    this.asyncInstance.ngOnDestroy();
  }
  
}