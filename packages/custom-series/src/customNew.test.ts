import { customNew } from './customNew';

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

// Test 1: Basic constructor with properties
console.log('\n=== Test 1: Basic Constructor ===');
function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
}

const person1 = customNew(Person, 'Alice', 25);
console.log(`✓ Creates instance with properties: ${person1.name === 'Alice' && person1.age === 25}`);
console.log(`✓ Instance is not null: ${person1 !== null}`);
console.log(`✓ Instance type is object: ${typeof person1 === 'object'}`);

// Test 2: Prototype chain
console.log('\n=== Test 2: Prototype Chain ===');
Person.prototype.sayHello = function() {
  return `Hello, I'm ${this.name}`;
};

const person2 = customNew(Person, 'Bob', 30);
console.log(`✓ Has access to prototype methods: ${person2.sayHello() === "Hello, I'm Bob"}`);
console.log(`✓ instanceof works correctly: ${person2 instanceof Person}`);

// Test 3: Compare with native new
console.log('\n=== Test 3: Compare with Native new ===');
const nativePerson = new Person('Charlie', 35);
const customPerson = customNew(Person, 'Charlie', 35);
console.log(`✓ Same properties: ${nativePerson.name === customPerson.name && nativePerson.age === customPerson.age}`);
console.log(`✓ Same prototype: ${nativePerson.sayHello() === customPerson.sayHello()}`);
console.log(`✓ Both are instances of Person: ${nativePerson instanceof Person && customPerson instanceof Person}`);

// Test 4: Constructor returning object (override behavior)
console.log('\n=== Test 4: Constructor Returning Object ===');
function Singleton(name: string) {
  this.name = name;
  // Explicitly return an object
  return { instanceName: name, type: 'singleton' };
}

const singleton = customNew(Singleton, 'Test');
console.log(`✓ Returns explicit object: ${singleton.instanceName === 'Test' && singleton.type === 'singleton'}`);
console.log(`✓ Does NOT have name property: ${!('name' in singleton)}`);

// Test 5: Constructor with methods
console.log('\n=== Test 5: Constructor with Methods ===');
function Counter(start: number) {
  this.count = start;
  this.increment = function() {
    this.count++;
  };
  this.getCount = function() {
    return this.count;
  };
}

const counter = customNew(Counter, 0);
counter.increment();
counter.increment();
console.log(`✓ Methods work correctly: ${counter.getCount() === 2}`);

// Test 6: Constructor with no arguments
console.log('\n=== Test 6: Constructor with No Arguments ===');
function NoArgs() {
  this.value = 'default';
}

const noArgs = customNew(NoArgs);
console.log(`✓ Works with no arguments: ${noArgs.value === 'default'}`);

// Test 7: Multiple instances are independent
console.log('\n=== Test 7: Multiple Instances ===');
const personA = customNew(Person, 'Alice', 25);
const personB = customNew(Person, 'Bob', 30);
console.log(`✓ Instances are independent: ${personA !== personB}`);
console.log(`✓ Different properties: ${personA.name !== personB.name}`);
personA.name = 'Modified';
console.log(`✓ Changes don't affect each other: ${personB.name === 'Bob'}`);

// Test 8: Constructor returning null
console.log('\n=== Test 8: Constructor Returning null ===');
function ReturnsNull() {
  this.value = 'test';
  return null;
}

const returnsNull = customNew(ReturnsNull);
console.log(`✓ Returns instance when null is returned: ${returnsNull.value === 'test'}`);

// Test 9: Constructor returning primitive
console.log('\n=== Test 9: Constructor Returning Primitive ===');
function ReturnsPrimitive() {
  this.value = 'test';
  return 42;
}

const returnsPrimitive = customNew(ReturnsPrimitive);
console.log(`✓ Returns instance when primitive is returned: ${returnsPrimitive.value === 'test'}`);

// Test 10: Complex constructor
console.log('\n=== Test 10: Complex Constructor ===');
function Book(title: string, author: string, price: number) {
  this.title = title;
  this.author = author;
  this.price = price;
  this.getDiscount = function(discount: number) {
    return this.price * (1 - discount);
  };
}

const book = customNew(Book, 'TypeScript Handbook', 'Microsoft', 49.99);
console.log(`✓ Complex object created: ${book.title === 'TypeScript Handbook'}`);
console.log(`✓ Methods with parameters work: ${book.getDiscount(0.1) === 44.991}`);

// Test 11: Constructor with internal state
console.log('\n=== Test 11: Constructor with Internal State ===');
function Stack() {
  this.items = [];
  this.push = function(item: any) {
    this.items.push(item);
  };
  this.pop = function() {
    return this.items.pop();
  };
}

const stack = customNew(Stack);
stack.push(1);
stack.push(2);
stack.push(3);
console.log(`✓ Internal state maintained: ${stack.pop() === 3 && stack.pop() === 2}`);

// Test 12: Verify prototype is correctly set
console.log('\n=== Test 12: Prototype Verification ===');
function Animal(type: string) {
  this.type = type;
}

const animal = customNew(Animal, 'Dog');
console.log(`✓ Prototype is constructor.prototype: ${Object.getPrototypeOf(animal) === Animal.prototype}`);
console.log(`✓ Constructor property is correct: ${animal.constructor === Animal}`);

console.log('\n=== All Tests Completed ===');
