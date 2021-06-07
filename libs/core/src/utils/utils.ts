import { clone, isEqual } from 'lodash-es';

export class Utils {
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

  public static isDifferent<T>(value1: T, value2: T): boolean {
    if (value1 == null && value2 == null) {
      return false;
    }

    if (value1 == null && value2 != null) {
      return true;
    }

    if (value1 != null && value2 == null) {
      return true;
    }

    if (typeof value1 !== 'object' && typeof value2 !== 'object') {
      return value1 !== value2;
    }

    if (value1 instanceof Array && value2 instanceof Array) {
      if (value1.length !== value2.length) {
        return true;
      }
    }

    return JSON.stringify(value1) !== JSON.stringify(value2);
  }

  public static isEqual<T>(value1: T, value2: T): boolean {
    return isEqual(value1, value2);
  }
}
