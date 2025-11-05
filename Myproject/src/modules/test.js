var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var t = "thiru";
// t = 3;  //number' is not assignable to type 'string
//var n:number = "thiru";   //string' is not assignable to type 'number'
var first = 10;
var second = 0x37CF; // hexadecimal (base 16)
var third = 255; // octal (base 8)
var fourth = 57; // binary (base 2)
console.log(first);
console.log(second);
console.log(third);
console.log(fourth);
console.log(typeof (first));
console.log(typeof (second));
console.log(typeof (third));
console.log(typeof (fourth));
var s1 = "Hello, World!";
var s2 = true;
var s3 = 42; // 'any' type can hold any value
var s4 = [1, 2, 3, 4, 5]; // array of numbers
var s5 = ["Age", 30]; // tuple
console.log(s1, " : ", typeof (s1));
console.log(s2, " : ", typeof (s2));
console.log(s3, " : ", typeof (s3));
console.log(s4, " : ", typeof (s4));
console.log(s5, " : ", typeof (s5));
//Array
console.log("===============================");
console.log("         Array Example         ");
console.log("===============================");
var fruits1 = ["Apple", "Banana", "Mango"];
var fruits2 = ["Orange", "Pineapple", "Grapes"];
var fruits3 = ["Kiwi", 42, true, "Peach"];
var fruits4 = ["Strawberry", 100, "Blueberry", 200];
var fruits5 = ["Watermelon", 300, "Papaya", 400];
// var arr: number[] = [1, 2, null, 3, 4, 5];
// var arr1: (number | string)[] = [1, "two", 3, null, "four"];
console.log(fruits1);
console.log(fruits2);
console.log(fruits3);
console.log(fruits4);
console.log(fruits5);
// console.log(arr);
// console.log(arr1);
//tuple
console.log("===============================");
console.log("         Tuple Example         ");
console.log("===============================");
var employee = [1, "John Doe"];
var person = ["Alice", 25, true];
var employee1 = [[1, "John"], [2, "Jane"], [3, "Doe"]];
console.log(employee);
console.log(person);
console.log(employee1);
//enum
console.log("===============================");
console.log("         Enum Example          ");
console.log("===============================");
var ColorEnum;
(function (ColorEnum) {
    ColorEnum[ColorEnum["Red"] = 0] = "Red";
    ColorEnum[ColorEnum["Green"] = 1] = "Green";
    ColorEnum[ColorEnum["Blue"] = 2] = "Blue";
})(ColorEnum || (ColorEnum = {}));
;
var c = ColorEnum.Green;
console.log(c); // Outputs: 1
//union and any
console.log("===============================");
console.log("        Union/Any Example          ");
console.log("===============================");
var unionVar;
unionVar = "Hello";
console.log(unionVar);
unionVar = 42;
console.log(unionVar);
// unionVar = true; // Error: Type 'boolean' is not assignable to type 'string | number'
var anyVar;
anyVar = "thiru";
console.log(anyVar);
anyVar = 6;
console.log(anyVar);
//void
console.log("\n===============================");
console.log("         Void Example         ");
console.log("===============================");
function sayHi() {
    console.log("Hi there!");
}
var speech = sayHi();
console.log("Value of speech:", speech); // Outputs: Value of speech: undefined
//never
console.log("\n===============================");
console.log("         Never Example         ");
console.log("===============================");
function throwError(message) {
    throw new Error(message);
}
function keepProcessing() {
    while (true) {
        console.log("Processing...");
    }
}
//keepProcessing();
//assertion
console.log("\n===============================");
console.log("      Assertion Example       ");
console.log("===============================");
var someValue = "This is a string";
var strLength = someValue.length;
console.log("String length:", strLength);
//functions
console.log("\n===============================");
console.log("       Functions Example       ");
console.log("===============================");
function add(x, y) {
    return x + y;
}
console.log("Sum:", add(5, 10));
function sum(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }
    else {
        return a.toString() + b.toString();
    }
}
console.log("Sum of numbers:", sum(5, 10)); // Outputs: 15
console.log("Concatenation of strings:", sum("Hello, ", "World!")); // Outputs: Hello, World!
console.log("\n-------- Function Overloading Example --------");
function sum1(a, b) {
    return a + b;
}
console.log("Sum1 of numbers:", sum1(20, 30)); // Outputs: 50
console.log("Concatenation1 of strings:", sum1("Type", "Script")); // Outputs: TypeScript
//abstract class
console.log("\n===============================");
console.log("    Abstract Class Example    ");
console.log("===============================");
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log("Moving along...");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.makeSound = function () {
        console.log("Woof! Woof!");
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.makeSound = function () {
        console.log("Meow! Meow!");
    };
    return Cat;
}(Animal));
var myDog = new Dog();
myDog.makeSound();
myDog.move();
var myCat = new Cat();
myCat.makeSound();
myCat.move();
//let animal = new Animal(); // Error: Cannot create an instance of an abstract class
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var Emp = /** @class */ (function () {
    function Emp(name) {
        this.name = name;
    }
    return Emp;
}());
