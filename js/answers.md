# Part A:

## A1. Predict the output

1. `"3" + 4 + 5` → `"345"`  
   JavaScript joins the values into a string from left to right.

2. `3 + 4 + "5"` → `"75"`  
   JavaScript adds 3 and 4 first, then joins the result with the string `"5"`.

3. `"20" / "4"` → `5`  
   The division operator converts numeric strings into numbers.

4. `null ?? "none"` → `"none"`  
   The nullish coalescing operator uses the second value when the first is `null` or `undefined`.

5. `"" || "empty"` → `"empty"`  
   An empty string is falsy, so the OR operator returns `"empty"`.

6. `typeof undefined` → `"undefined"`  
   The `typeof` operator returns the type as a string.

7. `Boolean("0")` → `true`  
   A non-empty string is truthy, even when it contains the character zero.

8. `"Rwanda".slice(1, 4)` → `"wan"`  
   `slice()` takes characters starting at index 1 and stops before index 4.

## A2. Identify and correct the bugs

The code has these problems:

- `total` is declared but not initialized.
- The loop starts at index 1 instead of index 0.
- `i <= members.length` can access an index outside the array.
- `=` assigns a value; `===` compares values.
- `total + 1` does not update `total`.
- `Console.log` should be `console.log`.
- `Total` should be lowercase `total`.

Corrected code:

```javascript
const members = ["Aline", "Eric", "Grace"];
let total = 0;

for (let i = 0; i < members.length; i++) {
  if (members[i] === "Eric") {
    total += 1;
  }
}

console.log(`Found ${total}`);
```

Expected output:

```text
Found 1
```

## A3. Short answers

1. **Difference between `let` and `const`:**  
   `let` allows a variable to be reassigned. `const` does not allow its variable binding to be reassigned.

2. **Why should a function return a value instead of only logging it?**  
   A returned value can be stored, reused, or passed to another calculation. A logged value is mainly displayed in the console.

3. **Difference between `for...of` and `for...in`:**  
   `for...of` iterates over values in an iterable, such as an array. `for...in` iterates over enumerable property keys, commonly object keys.
