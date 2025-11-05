console.log("\n===== Function Overloading Example (Simpler + Fixed Version) =====");
function findCommon1(arr1, arr2) {
    var v1;
    var v2;
    // --- Handle string input ---
    if (typeof arr1 === "string" && typeof arr2 === "string") {
        v1 = arr1.toLowerCase().split(""); // safer than [...string]
        v2 = arr2.toLowerCase().split("");
    }
    // --- Handle array input ---
    else {
        // Helper: Flatten nested arrays
        function flattenArray(arr) {
            return arr.reduce(function (acc, val) { return acc.concat(Array.isArray(val) ? flattenArray(val) : val); }, []);
        }
        v1 = flattenArray(arr1);
        v2 = flattenArray(arr2);
    }
    // --- Store unique results ---
    var result = new Set();
    for (var i = 0; i < v1.length; i++) {
        for (var j = 0; j < v2.length; j++) {
            if (v1[i] === v2[j]) {
                result.add(v1[i]);
                break;
            }
        }
    }
    return Array.from(result);
}
// 🔹 Test cases
console.log("Common in number arrays:", findCommon1([1, 2, 3, 4], [3, 4, 5, 6]));
console.log("Common in string arrays:", findCommon1(["apple", "banana"], ["banana", "cherry"]));
console.log("Common in strings:", findCommon1("hello", "world"));
console.log("Common in nested arrays:", findCommon1([1, 2, [3, 4]], [3, 4]));
