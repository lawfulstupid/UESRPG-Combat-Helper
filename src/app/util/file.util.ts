import { EventEmitter } from "@angular/core";
import JSZip from "@progress/jszip-esm";
import { Observable } from "rxjs";
import { ErrorComponent } from "../components/error/error.component";
import { Persistence } from "../persistence/persistence";
import { PersistableType } from "../persistence/types";

export class FileUtil {
  
  private static jszip: JSZip | null = null;

  static download(data: PersistableType | Blob, filename: string) {
    const blob = data instanceof Blob ? data : new Blob([Persistence.serialise(data)], {type: 'text/json'});
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();
  }
  
  static zip(data: PersistableType, filename: string) {
    if (!this.jszip) this.jszip = new JSZip();
    this.jszip.file(filename, Persistence.serialise(data));
  }
  
  static downloadZip(filename: string) {
    if (!this.jszip) return;
    this.jszip.generateAsync({type: 'blob'}).then(zip => {
      FileUtil.download(zip, filename);
      this.jszip = null;
    });
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
  
  static uploadMany<T extends PersistableType>(): Observable<Array<T>> {
    const tempEvent: EventEmitter<Array<T>> = new EventEmitter();
    const link = document.createElement('input');
    link.type = 'file';
    link.accept = '.json';
    link.multiple = true; // select multiple files
    
    link.onchange = () => {
      if (!link.files) return;
      
      const fileList: Array<File> = [];
      for (let i = 0; i < link.files.length; i++) {
        const file = link.files.item(i);
        if (file) fileList.push(file);
      }
      
      Promise.all(fileList.map(f => f.text())).then(texts => {
        try {
          tempEvent.emit(texts.map(x => Persistence.deserialise(x)));
        } catch (e) {
          ErrorComponent.error('Failed to parse files');
          throw e;
        }
      });
    };
    
    link.click();
    link.remove();
    return tempEvent;
  }
  
}