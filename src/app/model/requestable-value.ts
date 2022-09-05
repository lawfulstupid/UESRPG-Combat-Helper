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

export class RequestableValue<T> extends Serializable {

  private readonly name: string;
  private value?: T = undefined;

  constructor(name: string) {
    super();
    this.name = name;
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
        valueName: this.name
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