import { clone } from 'lodash-es';

export class Utils {
  /**
   * Creates a shallow clone of value.
   *
   * Note: This method is loosely based on the structured clone algorithm and supports cloning arrays, array buffers, booleans, date
   * objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. The own enumerable properties of arguments
   * objects are cloned as plain objects. An empty object is returned for uncloneable values such as error objects, functions, DOM nodes,
   * and WeakMaps.
   * https://lodash.com/docs/4.17.15#clone
   */
  public static clone<T>(value: T, updateClonedValueFn?: (clonedValue: T) => undefined | T | void): T {
    if (value == null) {
      return value;
    }

    let clonedValue: T = clone(value);
    if (updateClonedValueFn != null) {
      const updatedClonedValue: undefined | T | void = updateClonedValueFn(clonedValue);
      if (updatedClonedValue != null) {
        clonedValue = updatedClonedValue;
      }
    }

    return clonedValue;
  }
}
