// FizzBuzz: print numbers 1–100, replacing multiples of 3/5.
for (let number = 1; number <= 100; number += 1) {
  if (number % 15 === 0) console.log("FizzBuzz");
  else if (number % 3 === 0) console.log("Fizz");
  else if (number % 5 === 0) console.log("Buzz");
  else console.log(number);
}
