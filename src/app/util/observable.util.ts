import { EMPTY, mergeMap, Observable, of } from "rxjs";

export class ObservableUtil {
  
  // Iterates through provided Observables and returns the first one containing a (non-un)defined value
  public static coalesce<T>(...values: Array<Observable<T|undefined>>): Observable<T> {
    if (values.length === 0) {
      return EMPTY;
    } else {
      const [head, ...tail] = values;
      return head.pipe(mergeMap(value => {
        if (value !== undefined) {
          return of(value);
        } else {
          return this.coalesce<T>(...tail);
        }
      }));
    }
  }
  
}