const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const double = number.map((num) => {
  return num * 2;
});
console.log(double);

const even = number.filter((num) => {
  return num % 2 === 0;
});
console.log(even);


// checking the git setup