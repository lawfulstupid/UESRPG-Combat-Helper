import {
  mergeMap,
  Observable,
  of
} from 'rxjs';
import {StaticProvider} from '../static.provider';
import {
  ValueRequest,
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';

export class RequestableValue<T> {

  private valueName: string;
  private value?: T;

  constructor(valueName: string, value?: T) {
    this.valueName = valueName;
    this.value = value;
  }

  public get(): Observable<T> {
    if (this.value) {
      return of(this.value);
    } else {
      return this.populate();
    }
  }

  private populate(): Observable<T> {
    const config = {
      data: <ValueRequest>{
        valueName: this.valueName
      }
    }

    return StaticProvider.dialog.open(ValueRequestDialog, config).afterClosed().pipe(mergeMap(result => {
      if (result) {
        this.value = result;
        return of(result);
      } else {
        return this.populate();
      }
    }));
  }

}