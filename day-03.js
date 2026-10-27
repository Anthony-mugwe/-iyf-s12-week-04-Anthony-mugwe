// Find the largest number in an array.
function largestNumber(numbers) {
  if (numbers.length === 0) return null;
  return numbers.reduce((largest, current) => current > largest ? current : largest);
}
console.log(largestNumber([12, 7, 45, 3, 28])); // 45
