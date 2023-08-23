import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { Dialog } from '../dialog/dialog';
import { ObservableUtil } from './observable.util';

export class DialogUtil {

  private static get dialog(): MatDialog {
    return AppComponent.instance.dialog;
  }
  
  public static openRaw<T extends Dialog<T>>(dialog: ComponentType<T>, config: MatDialogConfig<any>): Observable<any> {
    return this.dialog.open(dialog, config).afterClosed();
  }
  
  public static open<T extends Dialog<T>>(dialog: ComponentType<T>, data?: any): Observable<any> {
    const config: MatDialogConfig<any> = { data: data };
    const response = this.openRaw(dialog, config);
    return ObservableUtil.coalesce(response).pipe(ObservableUtil.ignoreError);
  }

}