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
  
  public static openRaw<D extends Dialog<D,I,O>, I, O>(dialog: ComponentType<Dialog<D,I,O>>, config: MatDialogConfig<I>): Observable<O | undefined> {
    return this.dialog.open(dialog, config).afterClosed();
  }
  
  public static open: <D extends Dialog<D,I,O>, I, O>(
    ...[dialog, args]: void extends I ? OneArg<D,I,O> : TwoArgs<D,I,O>
  ) => Observable<O> = this.openInternal;

  private static openInternal<D extends Dialog<D,I,O>, I, O>(dialog: ComponentType<Dialog<D,I,O>>, data?: I): Observable<O> {
    const config: MatDialogConfig<I> = { data: data };
    const response: Observable<O | undefined> = this.openRaw(dialog, config);
    return ObservableUtil.coalesce(response).pipe(ObservableUtil.ignoreError);
  }
  
}

type OneArg<D,I,O> = [ComponentType<Dialog<D,I,O>>];
type TwoArgs<D,I,O> = [ComponentType<Dialog<D,I,O>>, I];