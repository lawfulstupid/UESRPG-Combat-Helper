import { mergeMap, Observable, of } from 'rxjs';
import { Identifier } from './identifier/identifier';
import {
  ValueRequest,
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';
import { StaticProvider } from '../static.provider';

export class NpcTemplate {

  name: string = '';
  data: {[key: string]: any} = {};
  
  constructor(name: string, data = {}) {
    this.name = name;
    this.data = data;
  }

  /* Information to store:
   * Characteristics
   * Attributes:
     * Hit Points
     * Wound Threshold
     * Magicka Points
     * Stamina Points
     * Initiative Rating
     * Action Point
     * Speed
     * Size
   * Skills
   * Unconventional Skills
   * Equipment Options
   * Special Abilities
   * Talents
   * Spells
   * Variants?
   */
  
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
      return this.get(stat);
    }));
  }
  
}