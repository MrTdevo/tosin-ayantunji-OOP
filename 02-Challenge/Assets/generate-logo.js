const fs = require("fs");
const inquirer = require("inquirer");
const { Triangle, Circle, Square } = require("./shapes.js");

const prompts = [
  {
    type: "input",
    name: "text",
    message: "Enter up to three characters for the SVG:",
    validate: (input) =>
      input.length <= 3 || "You can only enter up to three characters.",
  },
  {
    type: "input",
    name: "textColor",
    message: "Enter the text color (keyword or hexadecimal):",
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape for the SVG:",
    choices: ["Circle", "Triangle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter the shape color (keyword or hexadecimal):",
  },
];

function createShape(text, textColor, shape, shapeColor) {
  let shapeInstance;
  if (shape === "Circle") {
    shapeInstance = new Circle(shapeColor);
  } else if (shape === "Triangle") {
    shapeInstance = new Triangle(shapeColor);
  } else if (shape === "Square") {
    shapeInstance = new Square(shapeColor);
  }

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
 ${shapeInstance.render()}    
   <text x="150" y="125" font-size="60" fill="${textColor}" text-anchor="middle" alignment-baseline="middle">${text}</text>
    </svg>
  `;
  return svgContent;
}

function saveToFile(filename, content) {
  fs.writeFileSync(`newshapes/${filename}`, content);
  console.log("Generated logo.svg");
}

async function runApp() {
  const answers = await inquirer.prompt(prompts);
  const svgData = createShape(
    answers.text,
    answers.textColor,
    answers.shape,
    answers.shapeColor
  );
  saveToFile("logo.svg", svgData);
}

runApp();
