import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { ErrorComponent } from "../components/error/error.component";
import { Persistence } from "../persistence/persistence";
import { PersistableType } from "../persistence/types";

export class FileUtil {
  
  static download(data: PersistableType, filename: string) {
    const blob = new Blob([Persistence.serialise(data)], {type: 'text/json'});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();
  }
  
  static upload<T extends PersistableType>(): Observable<T> {
    const tempEvent: EventEmitter<T> = new EventEmitter();
    const link = document.createElement('input');
    link.type = 'file';
    link.accept = '.json';
    link.onchange = () => {
      link.files?.item(0)?.text().then(text => {
        try {
          tempEvent.emit(Persistence.deserialise(text));
        } catch (e) {
          ErrorComponent.error('Failed to parse file');
          throw e;
        }
      });
    };
    link.click();
    link.remove();
    return tempEvent;
  }
  
}