import { Identifier } from "../model/identifier";
import { Session } from "../model/session";
import { Persistence } from "../persistence/persistence";
import { LocalStorage } from "./local-storage";

export class SessionManager extends LocalStorage<Session> {
  
  override readonly MASTER_KEY: string = 'session';
  
  protected override construct(obj: any): Session {
    return new Session(obj.name, obj.stage, obj.timestamp);
  }
  
  override serialise(session: Session): string {
    return Persistence.serialise(session);
  }
  
  override deserialise(str: string): Session {
    return Persistence.deserialise(str);
  }
  
  /* STATIC ACCESS */
  
  static readonly instance: SessionManager = new SessionManager();
  
  static create(session: Session): Session {
    return this.instance.create(session);
  }
  
  static update(session: Session): Session {
    return this.instance.update(session);
  }
  
  static load(key: string): Session {
    return this.instance.load(key);
  }
  
  static delete(key: string) {
    return this.instance.delete(key);
  }
  
  static exists(key: string): boolean {
    return this.instance.exists(key);
  }
  
  static list(): Array<Identifier> {
    return this.instance.list();
  }
  
}