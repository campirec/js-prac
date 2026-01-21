type Cloneable = 
| object
| Array<any>
| Date
| RegExp
| Map<any, any>
| Set<any>
| null

export const deepClone = <T extends Cloneable>(obj: T, map: WeakMap<object, any> = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  if (obj instanceof Map) {
    if (map.has(obj)) {
      return map.get(obj);
    }
    const result = new Map();
    map.set(obj, result);
    obj.forEach((value, key) => {
      result.set(deepClone(key, map), deepClone(value, map));
    });
    return result as T;
  }

  if (obj instanceof Set) {
    if (map.has(obj)) {
      return map.get(obj);
    }
    const result = new Set();
    map.set(obj, result);
    obj.forEach((value) => {
      result.add(deepClone(value, map));
    });
    return result as T;
  }

  if (Array.isArray(obj)) {
    if (map.has(obj)) {
      return map.get(obj);
    }
    const result: any[] = [];
    map.set(obj, result);
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepClone(obj[i], map);
    }
    return result;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }
  const result: { [key: string]: any } = {};
  map.set(obj, result);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepClone((obj as { [key: string]: any })[key], map);
    }
  }
  return result;
}