type Cloneable = 
| object
| Array<any>
| Date
| RegExp
| Map<any, any>
| Set<any>

export const customDeepClone = <T extends Cloneable>(source: T, map: WeakMap<T, any> = new WeakMap()) => {
  if (typeof source !== 'object' || source === null) {
    return source
  }

  if (source instanceof Date) {
    return new Date(source.getTime())
  }

  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags)
  }

  if (source instanceof Map) {
    if (map.has(source)) {
      return map.get(source)
    }
    const result = new Map()
    map.set(source, result)
    source.forEach((value, key) => result.set(customDeepClone(key, map), customDeepClone(value, map)))
    return result
  }

  if (source instanceof Set) {
    if (map.has(source)) {
      return map.get(source)
    }
    const result = new Set()
    map.set(source, result)
    source.forEach(val => result.add(customDeepClone(val, map)))
    return result
  }

  if (Array.isArray(source)) {
    if (map.has(source)) {
      return map.get(source)
    }
    const result: any[] = []
    map.set(source, result)
    for(let i = 0; i < source.length; i++) {
      result[i] = customDeepClone(source[i], map)
    }
    return result
  }

  if (map.has(source)) {
    return map.get(source)
  }
  type CusObject = {[key: string | symbol]: any}
  const result: CusObject = {}
  map.set(source, result)
  for (let key of Reflect.ownKeys(source)) {
    result[key] = customDeepClone((source as CusObject)[key], map)
  }
  return result
}
