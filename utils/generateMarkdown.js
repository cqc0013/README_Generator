// Renders the license badge if license is present
// If there is no license, return an empty string
function renderLicenseBadge(license) {
    let licenseBadge;
  
    switch (license) {
      case "GNU AGPLv3":
        licenseBadge = { name: "GNU+AGPLv3", color: "red" };
        break;
      case "GNU GPLv3":
        licenseBadge = { name: "GNU+GPLv3", color: "orange" };
        break;
      case "GNU LGPLv3":
        licenseBadge = { name: "GNU+LGPLv3", color: "yellow" };
        break;
      case "Mozilla Public License 2.0":
        licenseBadge = { name: "Mozilla+2.0", color: "green" };
        break;
      case "Apache License 2.0":
        licenseBadge = { name: "Apache+2.0", color: "brightgreen" };
        break;
      case "MIT License":
        licenseBadge = { name: "MIT", color: "yellowgreen" };
        break;
      case "Boost Software License 1.0":
        licenseBadge = { name: "Boost+Software+1.0", color: "blue" };
        break;
      case "The Unlicense":
        licenseBadge = { name: "The+Unlicense", color: "blueviolet" };
        break;
      default:
        return '';
    }
  
    return `https://img.shields.io/static/v1?label=license&message=${licenseBadge.name}&color=${licenseBadge.color}`;
  }
  
  // Renders link to license information
  // If there is no license, return an empty string
  function renderLicenseLink(license) {
    let licensePath;
  
    switch (license) {
      case "GNU AGPLv3":
        licensePath = "agpl-3.0";
        break;
      case "GNU GPLv3":
        licensePath = "gpl-3.0";
        break;
      case "GNU LGPLv3":
        licensePath = "lgpl-3.0";
        break;
      case "Mozilla Public License 2.0":
        licensePath = "mpl-2.0";
        break;
      case "Apache License 2.0":
        licensePath = "apache-2.0";
        break;
      case "MIT License":
        licensePath = "mit";
        break;
      case "Boost Software License 1.0":
        licensePath = "bsl-1.0";
        break;
      case "The Unlicense":
        licensePath = "unlicense";
        break;
      default:
        licensePath = "";
    }
  
    return `https://choosealicense.com/licenses/${licensePath}/`;
  }
  
  // Renders license information
  // If there is no license, return an empty string
  function renderLicenseSection(license) {
    if (license) {
      let licenseLink = renderLicenseLink(license);
      return `This project is license under the ${license} - see the [License](${licenseLink})`;
    }
  
    return '';
  }
  
  // Generates markdown content
  function generateMarkdown(data) {
    licenseBadge = renderLicenseBadge(data.license);
    licenseSection = renderLicenseSection(data.license);
    imageLink = data.screenshot 
      ? `![Screenshot of the deployed website.](Insert link to your screenshot here!)` 
      : '';
    demoLink = data.demo
      ? `[Click Here to View a Demo.](Insert link to your demo here!)`
      : '';
    linkSection = data.link
      ? `## Link\n\n[Click Here to Deploy Page.](Insert link to your deployed page here!)`
      : '';
    includeLink = data.link
      ? `* [Link](#Link)`
      : '';
  
    result = `# ${data.title}
      \n![License](${licenseBadge}) 
      \n${data.description}
      \n${imageLink}
      \n## Table of Contents
      \n${includeLink}
      \n* [Installation](#Installation)
      \n* [Usage](#Usage)
      \n* [Contributing](#Contributing)
      \n* [Tests](#Tests)
      \n* [License](#License)
      \n* [Author](#Author)
      \n${linkSection}
      \n## Installation
      \n${data.installation}
      \n## Usage
      \n${data.usage}
      \n${demoLink}
      \n## Contributing
      \n${data.contributing}
      \n## Tests
      \n${data.tests}
      \n## License
      \n${licenseSection}
      \n## Author
      \n${data.name}
      \nGithub: [${data.github}](https://github.com/${data.github})`;
  
    return result;
  }
  
  module.exports = generateMarkdown;