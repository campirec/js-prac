
/**
 * 自定义实现 new 操作符
 * @param constructor 构造函数
 * @param args 构造函数参数
 * @returns 新创建的实例
 */
export function customNew<T>(
  constructor: new (...args: any[]) => T,
  ...args: any[]
): T {
  // 1. 创建一个新对象，原型指向构造函数的 prototype
  const ctx = Object.create(constructor.prototype)

  // 2. 执行构造函数，将 this 绑定到新对象
  const obj = constructor.apply(ctx, args)

  // 3. 判断返回值：
  //    - 如果构造函数显式返回了对象（非 null），则返回该对象
  //    - 否则返回新创建的 ctx
  return obj !== null && typeof obj === 'object' ? obj : ctx
}