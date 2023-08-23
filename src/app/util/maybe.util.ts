export type Maybe<T> = T | null | undefined;

export class MaybeUtil {
  
  public static isNothing<T>(maybe: Maybe<T>): boolean {
    return maybe === null || maybe === undefined;
  }
  
  public static isSomething<T>(maybe: Maybe<T>): boolean {
    return !this.isNothing(maybe);
  }
  
  public static getOrElse<T>(maybe: Maybe<T>, defaultValue: T): T {
    if (this.isSomething(maybe)) {
      return <T>maybe;
    } else {
      return defaultValue;
    }
  }
  
}