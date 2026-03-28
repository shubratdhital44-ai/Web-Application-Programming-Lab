
// 1. Variable Declarations: var, let, const

// var
var cityName = "Kathmandu";

// let
let currentYear = 2025;

// const
const appName = "JS Lab Demo";

// Output all three variable types
document.getElementById('variables').textContent =
  `cityName (var): ${cityName}\ncurrentYear (let): ${currentYear}\nappName (const): ${appName}`;

// 2. Regular Functions and Arrow Functions


// Traditional function declaration
function multiply(x, y) {
  return x * y; 
}
// Arrow function
const subtract = (x, y) => x - y;

// Show results of both function types
document.getElementById('functions').textContent =
  `multiply(4, 6) = ${multiply(4, 6)}\nsubtract(15, 9) = ${subtract(15, 9)}`;

// 3. Working with Objects

const student = {
  name: "Shubrat",
  rollNo: 59,
  introduce: function() { return `Hi, I'm ${this.name} and my roll number is ${this.rollNo}.`; }
};

// Display each property and call the method
document.getElementById('objects').textContent =
  `student.name: ${student.name}\nstudent.rollNo: ${student.rollNo}\nstudent.introduce(): ${student.introduce()}`;


// 4. Array Methods: map(), filter(), Spread

// Starting array
const scores = [10, 25, 30, 45, 50];

// map()
const bonusScores = scores.map(score => score * 2);

// filter()
const highScores = scores.filter(score => score > 25);

// Spread operator
const extraScores = [60, 75, 90];
const allScores = [...scores, ...extraScores];

// Display the results
document.getElementById('arrays').textContent =
  `Original scores:     [${scores}]\nBonus (×2) scores:   [${bonusScores}]\nHigh scores (>25):   [${highScores}]\nAll scores (spread): [${allScores}]`;  
