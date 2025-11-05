import { handleError } from "./utils.js";
export function sayHello(name) {
    try {
        if (name != null)
            console.log("Hello " + name);
        else
            throw new Error("Name cannot be null");
    }
    catch (err) {
        handleError("sayHello", err);
    }
}
export function dollarFunction() {
    try {
        function $() {
            console.log("Inside $ function");
        }
        const b = () => console.log("b function of $");
        $.b = b;
        $.b();
    }
    catch (err) {
        handleError("dollarFunction", err);
    }
}
export function blockExample() {
    try {
        function block() {
            function foo() {
                // Will throw because x is used before initialization
                console.log(x);
            }
            foo();
            let x = 3;
            foo();
        }
        block();
    }
    catch (err) {
        handleError("blockExample", err);
    }
}
