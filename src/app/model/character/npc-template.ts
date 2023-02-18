import { Observable, tap } from 'rxjs';
import { ObservableUtil } from 'src/app/util/observable.util';
import { persistable } from '../../persistence/persistable';
import { PersistableByProxy } from '../../persistence/persistable-proxy';
import { NpcTemplateManager } from '../../service/npc-template.manager';
import { Property } from '../property/abstract/property';
import { Data, DataCharacter, ValueFetcher } from './data-character';

@persistable
export class NpcTemplate extends DataCharacter implements PersistableByProxy<NpcTemplate,string> {

  constructor(readonly key: string, name: string, data: Data = {}) {
    super(name, data);
  }
  
  override put<T>(property: Property<T>, value: T) {
    super.put(property, value);
    NpcTemplateManager.update(this); // save update in local storage
  }
  
  // get value from user input
  override populate<T>(property: Property<T>, fetchMethod?: ValueFetcher<T>): Observable<T> {
    return ObservableUtil.coalesce(
      () => this.produceValue(property, fetchMethod)
    ).pipe(tap(value => {
      this.put(property, value);
    }));
  }
  
  proxy(): string {
    return this.key;
  }
  
  deproxy(proxy: string): NpcTemplate {
    return NpcTemplateManager.load(proxy);
  }
  
}