import {Injectable} from "@angular/core";
import {NpcTemplate} from "../model/npc-template";
import {BaseRepository} from "./base.repository";

@Injectable({providedIn: 'root'})
export class NpcTemplateRepository extends BaseRepository<NpcTemplate> {
  
  REPOSITORY_KEY = 'npcTemplate';

  override makeNew(): NpcTemplate {
    return new NpcTemplate();
  }

}