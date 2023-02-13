import { AbstractType } from "@angular/core";

// Object that can be persisted via simplification
export interface Simplifiable<T extends Simplifiable<T>> {
  simplify(): Simplified<T>;
}

// Object that can be safely/easily (de)serialised with JSON.stringify() and JSON.parse()
export interface Simplified<T extends Simplifiable<T>> {
  desimplify(): T;
}

// Object that requires no further simplification
export abstract class Simple<T extends Simple<T>> implements Simplifiable<T>, Simplified<T> {
  
  simplify(): T {
    return <T><any>this;
  }
  
  desimplify(): T {
    return <T><any>this;
  }
  
  static desimplify<T extends Simplifiable<T>>(obj: Simplified<T>, simpleClass: AbstractType<Simplified<T>>): T {
    Object.setPrototypeOf(obj, simpleClass.prototype);
    return obj.desimplify();
  }
  
}