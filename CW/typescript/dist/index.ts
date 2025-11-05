import { sayHello, dollarFunction, blockExample } from "./modules/functions.js";
import { Jedi, Sith, oopsExample } from "./modules/oops.js";
import { arrayExamples } from "./modules/arrays_maps_sets.js";
import { iteratorExamples, customIteratorExample } from "./modules/iterators.js";
import { basicGenerator, flattenGenerator } from "./modules/generators.js";
import { asyncSumExample } from "./modules/async_examples.js";
import { destructuringExample } from "./modules/destructuring.js";
import { symbolExamples } from "./modules/symbols.js";
import { reverse1, square } from "./modules/reverse.js";
import { findCommon1 } from "./modules/common_element.js";


function printSection(title: string): void {
  const line = "=".repeat(50);
  console.log(`\n${line}\n🔹 ${title}\n${line}`);
}

console.log("=== 🚀 TypeScript Modular Playground Started ===");

(async () => {
  try {
    printSection("FUNCTIONS MODULE");
    sayHello("Thiru");
    dollarFunction();
    blockExample();

    printSection("ITERATORS MODULE");
    iteratorExamples();
    customIteratorExample();

    printSection("ARRAYS / MAPS / SETS MODULE");
    arrayExamples();

    printSection("SYMBOLS MODULE");
    symbolExamples();

    printSection("OOPS MODULE");
    oopsExample();
    const yoda = new Jedi();
    const vader = new Sith();
    console.log("Direct Class Test:");
    console.log(`${yoda}`);
    console.log(`${vader}`);

    printSection("GENERATORS MODULE");
    basicGenerator();
    flattenGenerator();

    printSection("ASYNC / AWAIT MODULE");
    await asyncSumExample();

    printSection("DESTRUCTURING MODULE");
    destructuringExample();

    printSection("REVERSE UTIL MODULE");
    console.log("Reverse Array:", reverse1([1, 2, 3, 4]));
    console.log("Reverse String:", reverse1("thiru"));
    console.log("Reverse Number:", reverse1(57));
    console.log("Reverse of Square(4):", reverse1(square(4)));
    console.log("Reverse Array of Strings:", reverse1(["thiru", "murugan"]));

    printSection("FIND COMMON MODULE");

    console.log("Common in number arrays:", findCommon1([1, 2, 3, 4], [3, 4, 5, 6]));
    console.log("Common in string arrays:", findCommon1(["apple", "banana"], ["banana", "cherry"]));
    console.log("Common in strings:", findCommon1("hello", "world"));
    console.log("Common in nested arrays:", findCommon1([1, 2, [3, 4]], [3, 4]));
  } catch (err) {
    console.error("🔥 [index.ts] Fatal Error:", (err as Error).message);
  }
})();

console.log("\n=== ✅ Execution Completed ===");
