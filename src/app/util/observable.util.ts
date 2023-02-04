import { catchError, mergeMap, Observable, of, throwError } from "rxjs";
import { LazyUtil, MaybeLazy } from "./lazy.util";

export class ObservableUtil {
  
  // Iterates through provided Observables and returns the first one containing a (non-un)defined value
  public static coalesce<T>(...values: Array<MaybeLazy<Observable<T|undefined>>>): Observable<T> {
    if (values.length === 0) {
      return throwError(() => new Error('Unable to coalesce a value')); // critical to emulate ValueRequestDialog
    } else {
      const [head, ...tail] = values;
      return LazyUtil.resolve(head).pipe(
        catchError(() => of(undefined)), // Observables containing an error don't contain values, so we skip these too
        mergeMap(value => {
          if (value !== undefined) {
            return of(value);
          } else {
            return this.coalesce<T>(...tail);
          }
        })
      );
    }
  }
  
}