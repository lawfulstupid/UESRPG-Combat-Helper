import { Observable, of, tap } from 'rxjs';
import { ObservableUtil } from 'src/app/util/observable.util';
import {
  ValueRequestDialog
} from '../../dialog/value-request/value-request.dialog';
import { NpcTemplateManager } from '../../service/npc-template.manager';
import { Property } from '../property/abstract/property';
import { Data, DataCharacter } from './data-character';

export class NpcTemplate extends DataCharacter {

  readonly key: string;
  
  constructor(key: string, name: string, data: Data) {
    super(name, data);
    this.key = key;
  }
  
  override writeData<T>(property: Property<T>, value: T) {
    super.writeData(property, value);
    NpcTemplateManager.update(this); // save update in local storage
  }
  
  // get value from user input
  override populate<T>(property: Property<T>, useValue?: T): Observable<T> {
    return ObservableUtil.coalesce(
      of(useValue),
      () => ValueRequestDialog.requestValue(property, this)
    ).pipe(tap(value => {
      this.writeData(property, value);
    }));
  }
  
}