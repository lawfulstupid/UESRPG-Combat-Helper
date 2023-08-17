import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'range',
  pure: true
})
export class RangePipe implements PipeTransform {
  
  transform(num: number): Array<any> {
    return [...Array(num).keys()];
  }
  
}