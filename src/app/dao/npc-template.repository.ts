import {Injectable} from "@angular/core";
import {NpcTemplate} from "../model/npc-template";
import {BaseRepository} from "./base.repository";
import {ID} from '../model/serializable';

@Injectable({providedIn: 'root'})
export class NpcTemplateRepository extends BaseRepository<NpcTemplate> {
  
  REPOSITORY_KEY = 'npcTemplate';

  override makeNew(id: ID): NpcTemplate {
    return new NpcTemplate(id);
  }

}