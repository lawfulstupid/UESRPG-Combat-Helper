import { mergeMap, Observable, of } from 'rxjs';
import { AttributeEnum } from './enum/attribute.enum';
import { Identifier } from './identifier/identifier';
import {RequestableValue} from './requestable-value';
import {
  ValueRequest,
  ValueRequestDialog
} from '../dialog/value-request/value-request.dialog';
import {Serializable} from './serializable';
import { StaticProvider } from '../static.provider';

export class NpcTemplate extends Serializable {

  data: {[key: string]: any} = {};
  
  constructor(ident: Identifier, data = {}) {
    super(ident);
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
  
  get(ident: Identifier): Observable<any> {
    let value = this.data[ident.key];
    if (value) {
      return of(value);
    } else {
      return this.populate(ident);
    }
  }
  
  private populate(ident: Identifier): Observable<any> {
    const config = {
      data: <ValueRequest>{
        valueName: this.ident.name
      }
    }
    
    return StaticProvider.dialog.open(ValueRequestDialog, config).afterClosed().pipe(mergeMap(result => {
      this.data[ident.key] = result;
      return this.get(ident);
    }));
  }
  
}