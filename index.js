// Import external packages
const inquirer = require("inquirer");
const fs = require("fs");
// Import internal modules
const generateMarkdown = require('./utils/generateMarkdown.js');

// User questions
const questions = [
  {
    // Get project title
    type: "input",
    message: "What is the title of your project?",
    name: "title",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid project title is required.");
      }
      return true;
    },
  },
  {
    // Get project description
    type: "input",
    message: "Write a description of your project.",
    name: "description",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid project description is required.");
      }
      return true;
    },
  },
  {
    // Get screenshot confirmation
    type: "confirm",
    message: "Include a screenshot of the deployed project in the description?",
    name: "screenshot",
  },
  {
    // Get demo confirmation
    type: "confirm",
    message: "Include a Demo in this project?",
    name: "demo",
  },
  {
    // Get link confirmation
    type: "confirm",
    message: "Include a link to the deployed project in the description?",
    name: "link",
  },
  {
    // Get installation information
    type: "input",
    message:
      "Describe the steps required to install your project for the Installation section.",
    name: "installation",
  },
  {
    // Get project usage information
    type: "input",
    message:
      "Provide instructions and examples of your project in use for the Usage section.",
    name: "usage",
  },
  {
    // Get project contributing
    type: "input",
    message:
      "Provide guidelines on how other developers can contribute to your project.",
    name: "contributing",
  },
  {
    // Get project tests
    type: "input",
    message:
      "Provide any tests written for your application and provide examples on how to run them.",
    name: "tests",
  },
  {
    // Get project license
    type: "list",
    message: "Choose a license for your project.",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
      "The Unlicense",
    ],
    name: "license",
  },
  {
    // Get author name
    type: "input",
    message: "What is your name?",
    name: "name",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid author name is required.");
      }
      return true;
    },
  },
  {
    // Get github username
    type: "input",
    message: "What is your Github username? (No @ needed)",
    name: "github",
    validate: function (answer) {
      if (answer.length < 1) {
        return console.log("A valid GitHub username is required.");
      }
      return true;
    },
  },
  {
    // Get target directory
    type: "input",
    message:
      "Please enter the relative file path of your target directory for the README file. Leave blank to view the file in the local './output' directory.",
    name: "filePath",
  },
];

// README file writer
function writeToFile(filePath, data) {
    let detectFilePath = filePath ? filePath : './output';
    fs.writeFile(`${detectFilePath}/README.md`, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success");
    });
}

// program initialization
async function init() {
    try {
        const userResponse = await inquirer.prompt(questions);
        console.log('User Response: ', userResponse);
        
        const markdown = generateMarkdown(userResponse);
        console.log(markdown);

        writeToFile(userResponse.filePath, markdown);
        console.log("README Generation Complete.");

    } catch (err) {
        console.error();
    }
}

// Function call to initialize app
init();