var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function reverse1(value) {
    try {
        // --- String ---
        if (typeof value === "string") {
            return value.split("").reverse().join("");
        }
        // --- Array ---
        if (Array.isArray(value)) {
            return __spreadArray([], value, true).reverse();
        }
        // --- Number ---
        if (typeof value === "number") {
            var reversed = value.toString().split("").reverse().join("");
            return Number(reversed);
        }
        throw new Error("Unsupported type");
    }
    catch (err) {
        console.error("Error in reverse1:", err.message);
        return value;
    }
}
// ✅ square function
function square(num) {
    return num * num;
}
// 🔹 Test cases
console.log(reverse1([1, 2, 3, 4])); // [4, 3, 2, 1]
console.log(reverse1(["thiru", "murugan"]));
console.log(reverse1("thiru")); // "uriht"
console.log(reverse1(57)); // 75
console.log(reverse1(1222)); // 2221
console.log(reverse1(square(4))); // 61 (4² = 16 → reversed = 61)
