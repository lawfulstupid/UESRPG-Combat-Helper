export abstract class Enum {
  
  /* PURE REFLECTIVE JANK // IT JUST WORKS */
  
  key(): string {
    return Enum.key(this, Object.getPrototypeOf(this).constructor);
  }
  
  static keys<T>(clazz: any = this): Array<string> {
    return Object.keys(clazz);
  }
  
  static key<T>(enumValue: T, clazz: any = this): string {
    return <string> this.keys(clazz).find(enumKey => clazz[enumKey] === enumValue);
  }
  
  static values<T>(clazz: any = this): Array<T> {
    return this.keys(clazz).map(enumKey => clazz[enumKey]);
  }
  
  static value<T>(key: string, clazz: any = this): T {
    return clazz[key];
  }
  
  protected constructor(readonly name: string) {}
  
}