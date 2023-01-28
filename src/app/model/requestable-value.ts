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
import {Serializable} from './serializable';
import { Identifier } from './identifier/identifier';

export class RequestableValue<T> extends Serializable {

  private value?: T = undefined;

  constructor(lookup: Identifier) {
    super(lookup);
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
        valueName: this.ident.name
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