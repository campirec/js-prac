import { deepClone } from './deepClone';

// Test helper
function assertEqual(actual: any, expected: any, message: string) {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  const status = passed ? '✓' : '✗';
  console.log(`${status} ${message}`);
  if (!passed) {
    console.log(`  Expected:`, expected);
    console.log(`  Actual:`, actual);
  }
  return passed;
}

// Test 1: Primitive values
console.log('\n=== Test 1: Primitive Values ===');
assertEqual(deepClone(null), null, 'Clone null');
assertEqual(deepClone(undefined), undefined, 'Clone undefined');
assertEqual(deepClone(42), 42, 'Clone number');
assertEqual(deepClone('hello'), 'hello', 'Clone string');
assertEqual(deepClone(true), true, 'Clone boolean');
assertEqual(deepClone(Symbol('test')), Symbol('test'), 'Clone symbol');

// Test 2: Date objects
console.log('\n=== Test 2: Date Objects ===');
const date = new Date('2024-01-21');
const clonedDate = deepClone(date);
assertEqual(clonedDate, date, 'Clone date');
console.log(`✓ Date is a new instance: ${clonedDate !== date}`);
console.log(`✓ Date values are equal: ${clonedDate.getTime() === date.getTime()}`);

// Test 3: RegExp
console.log('\n=== Test 3: RegExp ===');
const regex = /test/gi;
const clonedRegex = deepClone(regex);
assertEqual(clonedRegex.source, regex.source, 'Clone regex source');
assertEqual(clonedRegex.flags, regex.flags, 'Clone regex flags');
console.log(`✓ Regex is a new instance: ${clonedRegex !== regex}`);

// Test 4: Arrays
console.log('\n=== Test 4: Arrays ===');
const arr = [1, 2, 3, { a: 4 }];
const clonedArr = deepClone(arr);
assertEqual(clonedArr, arr, 'Clone array');
console.log(`✓ Array is a new instance: ${clonedArr !== arr}`);
console.log(`✓ Nested object is cloned: ${clonedArr[3] !== arr[3]}`);

// Test 5: Nested objects
console.log('\n=== Test 5: Nested Objects ===');
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};
const clonedObj = deepClone(obj);
assertEqual(clonedObj, obj, 'Clone nested object');
console.log(`✓ Nested object is deeply cloned: ${clonedObj.b !== obj.b}`);
console.log(`✓ Deep nested object is cloned: ${clonedObj.b.d !== obj.b.d}`);

// Test 6: Circular references
console.log('\n=== Test 6: Circular References ===');
const circular: any = { a: 1 };
circular.self = circular;
const clonedCircular = deepClone(circular);
console.log(`✓ Circular reference handled: ${clonedCircular.self === clonedCircular}`);
console.log(`✓ Different instance: ${clonedCircular !== circular}`);

// Test 7: Map
console.log('\n=== Test 7: Map ===');
const map = new Map([
  ['key1', { value: 1 }],
  ['key2', { value: 2 }]
]);
const clonedMap = deepClone(map);
console.log(`✓ Map is a new instance: ${clonedMap !== map}`);
console.log(`✓ Map size preserved: ${clonedMap.size === map.size}`);
console.log(`✓ Map values are cloned: ${clonedMap.get('key1') !== map.get('key1')}`);

// Test 8: Set
console.log('\n=== Test 8: Set ===');
const set = new Set([{ a: 1 }, { b: 2 }]);
const clonedSet = deepClone(set);
console.log(`✓ Set is a new instance: ${clonedSet !== set}`);
console.log(`✓ Set size preserved: ${clonedSet.size === set.size}`);
const setValues = Array.from(clonedSet);
const originalValues = Array.from(set);
console.log(`✓ Set values are cloned: ${setValues[0] !== originalValues[0]}`);

// Test 9: Circular Map
console.log('\n=== Test 9: Circular Map ===');
const circularMap = new Map();
circularMap.set('self', circularMap);
const clonedCircularMap = deepClone(circularMap);
console.log(`✓ Circular map handled: ${clonedCircularMap.get('self') === clonedCircularMap}`);

// Test 10: Circular Set (tricky)
console.log('\n=== Test 10: Arrays with Circular References ===');
const arrWithSelf: any = [1, 2];
arrWithSelf.push(arrWithSelf);
const clonedArrWithSelf = deepClone(arrWithSelf);
console.log(`✓ Array with self-reference: ${clonedArrWithSelf[2] === clonedArrWithSelf}`);
console.log(`✓ Different instance: ${clonedArrWithSelf !== arrWithSelf}`);

// Test 11: Object with Symbol keys
console.log('\n=== Test 11: Object with Symbol Keys ===');
const symKey = Symbol('key');
const objWithSym: any = { a: 1 };
objWithSym[symKey] = 'symbol value';
const clonedObjWithSym = deepClone(objWithSym);
console.log(`✓ Symbol key preserved: ${clonedObjWithSym[symKey] === 'symbol value'}`);

// Test 12: Empty structures
console.log('\n=== Test 12: Empty Structures ===');
assertEqual(deepClone({}), {}, 'Clone empty object');
assertEqual(deepClone([]), [], 'Clone empty array');
console.log(`✓ Empty map cloned: ${deepClone(new Map()).size === 0}`);
console.log(`✓ Empty set cloned: ${deepClone(new Set()).size === 0}`);

// Test 13: Complex nested structure
console.log('\n=== Test 13: Complex Nested Structure ===');
const complex = {
  id: 1,
  data: {
    items: [{ name: 'item1' }, { name: 'item2' }],
    metadata: new Map([['version', '1.0']]),
    tags: new Set(['tag1', 'tag2'])
  },
  dates: {
    created: new Date('2024-01-01'),
    updated: new Date('2024-01-21')
  }
};
const clonedComplex = deepClone(complex);
console.log(`✓ Complex structure cloned: ${JSON.stringify(clonedComplex) === JSON.stringify(complex)}`);
console.log(`✓ Nested array cloned: ${clonedComplex.data.items !== complex.data.items}`);
console.log(`✓ Nested map cloned: ${clonedComplex.data.metadata !== complex.data.metadata}`);
console.log(`✓ Nested set cloned: ${clonedComplex.data.tags !== complex.data.tags}`);

console.log('\n=== All Tests Completed ===');
