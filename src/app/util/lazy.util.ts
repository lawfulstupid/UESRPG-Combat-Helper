export type Lazy<T> = () => T;
export type MaybeLazy<T> = T | Lazy<T>;

export class LazyUtil {
  
  public static resolve<T>(maybeLazy: MaybeLazy<T>): T {
    if (maybeLazy instanceof Function) {
      return maybeLazy();
    } else {
      return maybeLazy;
    }
  };
  
}