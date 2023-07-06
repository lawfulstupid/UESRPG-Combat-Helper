import { Persistable, RegisterPersistable } from "../persistence/persistable";
import { Npc } from "./character/npc";

@RegisterPersistable('ec98d2f4-1e7a-4af9-95c8-25569c185a6a')
export class Session implements Persistable<Session> {
  
  constructor(
    public name: string,
    public stage: Array<Array<Npc>>,
    public timestamp: string = new Date().toISOString().slice(0,-5)
  ) {}
  
  get key(): string {
    return 'session-' + this.timestamp;
  }
  
  clone(): Session {
    return new Session(this.name, this.stage, this.timestamp);
  }
  
}