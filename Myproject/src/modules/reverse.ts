function reverse1(value: string): string;
function reverse1<T>(value: T[]): T[];
function reverse1(value: number): number;
function reverse1(value: any): any {
  try {
    // --- String ---
    if (typeof value === "string") {
      return value.split("").reverse().join("");
    }

    // --- Array ---
    if (Array.isArray(value)) {
      return [...value].reverse();
    }

    // --- Number ---
    if (typeof value === "number") {
      const reversed = value.toString().split("").reverse().join("");
      return Number(reversed);
    }

    throw new Error("Unsupported type");
  } catch (err: any) {
    console.error("Error in reverse1:", err.message);
    return value;
  }
}

// ✅ square function
function square(num: number): number {
  return num * num;
}

// 🔹 Test cases
console.log(reverse1([1, 2, 3, 4]));  // [4, 3, 2, 1]
console.log(reverse1(["thiru","murugan"]));
console.log(reverse1("thiru"));      // "uriht"
console.log(reverse1(57));           // 75
console.log(reverse1(1222));         // 2221
console.log(reverse1(square(4)));    // 61 (4² = 16 → reversed = 61)
