"use strict";
var t = "thiru";
// t = 3;  //number' is not assignable to type 'string
//var n:number = "thiru";   //string' is not assignable to type 'number'
var first = 10;
var second = 0x37CF; // hexadecimal (base 16)
var third = 0o377; // octal (base 8)
var fourth = 0b111001; // binary (base 2)
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
let speech = sayHi();
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
let someValue = "This is a string";
let strLength = someValue.length;
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
// function findCommon(a: any, b: any): any {
//     // For strings
//     if (typeof a === "string" && typeof b === "string") {
//       const s1 = a.toLowerCase().split("");
//       const s2 = b.toLowerCase().split("");
//       const common: string[] = [];
//       for (let ch of s1) {
//         if (s2.includes(ch) && !common.includes(ch)) {
//           common.push(ch);
//         }
//       }
//       return common.join("");
//     }
//     // For arrays (flatten nested arrays)
//     if (Array.isArray(a) && Array.isArray(b)) {
//       const flatA = a.flat ? a.flat(Infinity) : a; // in case flat() not supported
//       const common: any[] = [];
//       for (let val of flatA) {
//         if (b.includes(val) && !common.includes(val)) {
//           common.push(val);
//         }
//       }
//       return common;
//     }
//     return [];
//   }
//   // ✅ Example 1: Arrays
//   console.log(findCommon([1, 2, [3, 4, 5]], [4, 5, 6, 7])); // [4, 5]
//   // ✅ Example 2: Strings
//   console.log(findCommon("thiru", "murugan")); // "ru"
