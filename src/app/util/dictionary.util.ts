export type Dictionary<T> = {[key: string]: T};

export class DictionaryUtil {
  
  public static iterate<T>(dictionary: Dictionary<T>, consumer: (key: string, value: T) => void) {
    Object.entries(dictionary).forEach(([key, value]) => {
      consumer(key, value);
    });
  }
  
}