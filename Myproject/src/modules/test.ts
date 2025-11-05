var t:string = "thiru";

// t = 3;  //number' is not assignable to type 'string

//var n:number = "thiru";   //string' is not assignable to type 'number'


var first: number = 10;
var second: number = 0x37CF; // hexadecimal (base 16)
var third: number = 0o377;   // octal (base 8)
var fourth: number = 0b111001; // binary (base 2)

console.log(first);
console.log(second);
console.log(third);
console.log(fourth);

console.log(typeof(first)); 
console.log(typeof(second)); 
console.log(typeof(third)); 
console.log(typeof(fourth)); 

var s1: string = "Hello, World!";
var s2: boolean = true;
var s3: any = 42; // 'any' type can hold any value
var s4: number[] = [1, 2, 3, 4, 5]; // array of numbers
var s5: [string, number] = ["Age", 30]; // tuple

console.log(s1," : ",typeof(s1));
console.log(s2," : ",typeof(s2));
console.log(s3," : ",typeof(s3));
console.log(s4," : ",typeof(s4));
console.log(s5," : ",typeof(s5));

//Array
console.log("===============================");
console.log("         Array Example         ");
console.log("===============================");

var fruits1: string[] = ["Apple", "Banana", "Mango"];
var fruits2: Array<string> = ["Orange", "Pineapple", "Grapes"];
var fruits3: any[] = ["Kiwi", 42, true, "Peach"];

var fruits4: (string | number)[] = ["Strawberry", 100, "Blueberry", 200];
var fruits5: Array<string | number> = ["Watermelon", 300, "Papaya", 400];

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

var employee: [number, string] = [1, "John Doe"];
var person : [string, number, boolean] = ["Alice", 25, true];

var employee1: [number, string][] = [[1, "John"], [2, "Jane"], [3, "Doe"]];

console.log(employee);
console.log(person);
console.log(employee1);

//enum
console.log("===============================");
console.log("         Enum Example          ");
console.log("===============================");

enum ColorEnum {
    Red,
    Green,
    Blue
};
var c: ColorEnum = ColorEnum.Green;
console.log(c); // Outputs: 1

//union and any
console.log("===============================");
console.log("        Union/Any Example          ");
console.log("===============================");

var unionVar: string | number;
unionVar = "Hello";
console.log(unionVar);
unionVar = 42;
console.log(unionVar);
// unionVar = true; // Error: Type 'boolean' is not assignable to type 'string | number'

var anyVar: any;
anyVar = "thiru";
console.log(anyVar);
anyVar = 6;
console.log(anyVar);


//void
console.log("\n===============================");
console.log("         Void Example         ");
console.log("===============================");

function sayHi(): void {
    console.log("Hi there!");
}
let speech: void = sayHi();
console.log("Value of speech:", speech); // Outputs: Value of speech: undefined

//never
console.log("\n===============================");
console.log("         Never Example         ");
console.log("===============================");

function throwError(message: string): never {
    throw new Error(message);
}

function keepProcessing(): never {
    while (true) {
        console.log("Processing...");
    }
}

//keepProcessing();

//assertion
console.log("\n===============================");
console.log("      Assertion Example       ");
console.log("===============================");

let someValue: any = "This is a string";
let strLength: number = (someValue as string).length;
console.log("String length:", strLength);



//functions
console.log("\n===============================");
console.log("       Functions Example       ");
console.log("===============================");

function add (x: number, y: number): number {
    return x + y;
}
console.log("Sum:", add(5, 10));



function sum(a:(number|string), b:(number|string)): (string|number) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else {
        return a.toString() + b.toString();
    }
}

console.log("Sum of numbers:", sum(5, 10)); // Outputs: 15
console.log("Concatenation of strings:", sum("Hello, ", "World!")); // Outputs: Hello, World!


console.log("\n-------- Function Overloading Example --------");

function sum1(a:number, b:number) : number;

function sum1(a:string, b:string) : string;

function sum1(a:any, b:any) : any {
    return a + b;
}

console.log("Sum1 of numbers:", sum1(20, 30)); // Outputs: 50
console.log("Concatenation1 of strings:", sum1("Type", "Script")); // Outputs: TypeScript


//abstract class

console.log("\n===============================");
console.log("    Abstract Class Example    ");
console.log("===============================");

abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log("Moving along...");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof! Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow! Meow!");
    }
}

let myDog:Animal = new Dog();
myDog.makeSound();
myDog.move();
let myCat = new Cat();
myCat.makeSound();
myCat.move();
//let animal = new Animal(); // Error: Cannot create an instance of an abstract class


class Person {
    name : string;
    constructor(name: string) {
        this.name = name;
    }
}

class Emp{
    name : string;
    constructor(name: string) {
        this.name = name;
    }
}


