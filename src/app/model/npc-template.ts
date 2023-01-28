import { tap, Observable } from 'rxjs';
import { Property } from './lookup/property';
import {
  ValueRequest,
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';
import { StaticProvider } from '../static.provider';
import { NpcTemplateRepository } from '../service/npc-template-repository';
import { DataCharacter } from './data-character';

export class NpcTemplate extends DataCharacter {

  readonly key: string;
  
  constructor(name: string, key: string, data = {}) {
    super(name, data);
    this.key = key;
  }
  
  protected override writeData<T>(property: Property, value: T) {
    super.writeData(property, value);
    NpcTemplateRepository.save(this); // save update in local storage
  }
  
  // get value from user input
  protected override populate<T>(property: Property, castFn: (json: string) => T): Observable<T> {
    return ValueRequestDialog.requestValue(this, property, castFn).pipe(tap(value => {
      this.writeData(property, value);
    }));
  }
  
}