export type Dictionary<T> = {[key: string]: T};

export class DictionaryUtil {
  
  // Iterates over each (key,value) pair
  public static iterate<T>(dictionary: Dictionary<T>, consumer: (key: string, value: T) => void) {
    Object.entries(dictionary).forEach(([key, value]) => {
      consumer(key, value);
    });
  }
  
  // Transforms every value in the dictionary
  public static map<A,B>(dictionary: Dictionary<A>, transform: (key: string, value: A) => B): Dictionary<B> {
    const newDict: Dictionary<B> = {};
    this.iterate(dictionary, (key, value) => {
      newDict[key] = transform(key, value);
    });
    return newDict;
  }
  
  // Same as above but discards the keys
  public static mapToList<A,B>(dictionary: Dictionary<A>,transform: (key: string, value: A) => B): Array<B> {
    const results: Array<B> = [];
    this.iterate(dictionary, (key, value) => {
      results.push(transform(key, value));
    });
    return results;
  }
  
}