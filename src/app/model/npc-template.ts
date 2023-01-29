import { Observable, tap } from 'rxjs';
import {
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';
import { NpcTemplateManager } from '../service/npc-template.manager';
import { DataCharacter } from './data-character';
import { Property } from './lookup/property';

export class NpcTemplate extends DataCharacter {

  readonly key: string;
  
  constructor(key: string, name: string, data = {}) {
    super(name, data);
    this.key = key;
  }
  
  override writeData<T>(property: Property, value: T) {
    super.writeData(property, value);
    NpcTemplateManager.update(this); // save update in local storage
  }
  
  // get value from user input
  protected override populate<T>(property: Property, castFn: (json: string) => T): Observable<T> {
    return ValueRequestDialog.requestValue(this, property, castFn).pipe(tap(value => {
      this.writeData(property, value);
    }));
  }
  
}