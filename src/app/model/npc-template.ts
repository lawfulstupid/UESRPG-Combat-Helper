import { mergeMap, Observable, of } from 'rxjs';
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
  
  get(stat: Identifier): Observable<any> {
    let value = this.data[stat.key];
    if (value) {
      return of(value);
    } else {
      return this.populate(stat);
    }
  }
  
  private populate(stat: Identifier): Observable<any> {
    const config = {
      data: <ValueRequest>{
        valueName: stat.name
      }
    }
    
    return StaticProvider.dialog.open(ValueRequestDialog, config).afterClosed().pipe(mergeMap(result => {
      this.data[stat.key] = result;
      NpcTemplateRepository.save(this);
      return this.get(stat);
    }));
  }
  
}