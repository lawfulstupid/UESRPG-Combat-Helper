import { AsyncPipe } from "@angular/common";
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from "@angular/core";
import { Observable, Subscribable } from "rxjs";
import { Maybe, MaybeUtil } from "../util/maybe.util";

@Pipe({
  name: 'asyncDefault',
  pure: false
})
export class AsyncDefaultPipe implements OnDestroy, PipeTransform {
  
  private asyncInstance: AsyncPipe;
  
  constructor(ref: ChangeDetectorRef) {
    this.asyncInstance = new AsyncPipe(ref);
  }
  
  transform<T>(obj: Maybe<Observable<Maybe<T>> | Subscribable<Maybe<T>> | Promise<Maybe<T>>>, defaultValue: T): T {
    const value: Maybe<T> = this.asyncInstance.transform(obj);
    return MaybeUtil.getOrElse(value, defaultValue);
  }
  
  ngOnDestroy() {
    this.asyncInstance.ngOnDestroy();
  }
  
}