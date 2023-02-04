import { EMPTY, mergeMap, Observable, of } from "rxjs";
import { LazyUtil, MaybeLazy } from "./lazy.util";

export class ObservableUtil {
  
  // Iterates through provided Observables and returns the first one containing a (non-un)defined value
  public static coalesce<T>(...values: Array<MaybeLazy<Observable<T|undefined>>>): Observable<T> {
    if (values.length === 0) {
      return EMPTY;
    } else {
      const [head, ...tail] = values;
      return LazyUtil.resolve(head).pipe(mergeMap(value => {
        if (value !== undefined) {
          return of(value);
        } else {
          return this.coalesce<T>(...tail);
        }
      }));
    }
  }
  
}