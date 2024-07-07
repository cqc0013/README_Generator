const inquirer = require("inquirer");
const fs = require("fs");

const generateMarkdown = require('./utils/generateMarkdown.js');


const questions = [
  {
    
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
    
    type: "confirm",
    message: "Include a screenshot of the deployed project in the description?",
    name: "screenshot",
  },
  {
    
    type: "confirm",
    message: "Include a Demo in this project?",
    name: "demo",
  },
  {
   
    type: "confirm",
    message: "Include a link to the deployed project in the description?",
    name: "link",
  },
  {
    
    type: "input",
    message:
      "Describe the steps required to install your project for the Installation section.",
    name: "installation",
  },
  {
    
    type: "input",
    message:
      "Provide instructions and examples of your project in use for the Usage section.",
    name: "usage",
  },
  {
    
    type: "input",
    message:
      "Provide guidelines on how other developers can contribute to your project.",
    name: "contributing",
  },
  {
   
    type: "input",
    message:
      "Provide any tests written for your application and provide examples on how to run them.",
    name: "tests",
  },
  {
    
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
    
    type: "input",
    message:
      "Please enter the relative file path of your target directory for the README file. Leave blank to view the file in the local './output' directory.",
    name: "filePath",
  },
];


function writeToFile(filePath, data) {
    let detectFilePath = filePath ? filePath : './output';
    fs.writeFile(`${detectFilePath}/README.md`, data, err => {
        if (err) {
            return console.log(err);
        }
        console.log("Success");
    });
}


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


init();