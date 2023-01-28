import { identity, mergeMap, Observable, of } from 'rxjs';
import { Identifier } from './identifier/identifier';
import {
  ValueRequest,
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';
import { StaticProvider } from '../static.provider';
import { NpcTemplateRepository } from '../service/npc-template-repository';

export class NpcTemplate {

  readonly key: string;
  name?: string;
  data: {[key: string]: any} = {};
  
  constructor(key: string, name?: string, data = {}) {
    this.key = key;
    this.name = name;
    this.data = data;
  }
  
  private getRaw<T>(property: Identifier, castFn: (json: string) => T): Observable<T> {
    let value: T = this.data[property.key];
    if (value) {
      return of(value);
    }
    
    const config = {
      data: <ValueRequest>{
        valueName: property.name
      }
    }
    
    return StaticProvider.dialog.open(ValueRequestDialog, config).afterClosed().pipe(mergeMap(result => {
      this.data[property.key] = castFn(result);
      NpcTemplateRepository.save(this);
      return this.getRaw(property, castFn);
    }));
  }
  
  getStat(stat: Identifier): Observable<number> {
    return this.getRaw(stat, Number.parseInt);
  }
  
  getText(textId: Identifier): Observable<string> {
    return this.getRaw(textId, identity);
  }
  
  getObject<T>(id: Identifier, castFn: (json: string) => T): Observable<T> {
    return this.getRaw(id, castFn);
  }
  
}