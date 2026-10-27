// Remove duplicates from an array.
function removeDuplicates(values) {
  return [...new Set(values)];
}
console.log(removeDuplicates([1, 2, 2, 3, 1, 4])); // [1, 2, 3, 4]
