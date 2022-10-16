// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
// TODO: Create an array of questions for user input

const generateReadMe = ({ title, desc, license, install, usage, cont, tests, githubConfirm, github, emailConfirm, email }) =>
`
# ${title}

### ${desc}

---

## Table of Contents:
* <a href="#install-ref">Installation Instructions</a>
* <a href="#usage-ref">Usage Information</a>
* <a href="#cont-ref">Contribution Guidlines</a>
* <a href="#tests-ref">Tests Instructions</a>
* <a href="#license-ref">License</a>
${githubConfirm === true ? "* <a href='#questions-ref'>Questions</a>" :
    emailConfirm === true ? "* <a href='#questions-ref'>Questions</a>" :
    ""}

---

## <span id="install-ref">Installation Instructions</span>

${install} \n\n<br>

## <span id="usage-ref">Usage Information</span>

${usage} \n\n<br>

## <span id="cont-ref">Contribution Guidlines</span>

${cont} \n\n<br>

## <span id="tests-ref">Tests Instructions</span>

${tests} \n\n<br>

## <span id="license-ref">License Information</span>

${license == "Public Domain" ? "This application is open source. You are free to install, use, and modify this software as you see fit!" :

  license == "LGP" ? "This application is covered under the GNU General Public License (LGPL). You can link to any publicly available libraries in your software." :

  license == "Permissive" ? "This application is covered under a permissive license. Restricitons or requirements for public usage or modification may apply." :

  license == "Copyleft" ? "This application is subject to the terms of a copyleft license. Restrictions may apply." : 
  
  "This is a proprietary application. Copying, modifying, or otherwise distributing this software is prohibited."}

  ${githubConfirm === true ? 
  
    "<br>\n\n## <span id='questions-ref'>Questions?</span>\n\n---" :
    
    emailConfirm === true ?
  
    "<br>\n\n## <span id='questions-ref'>Questions?</span>\n\n---" : ""}

<div style = "display: flex; justify-content: space-between;">
    <div style = "display: ${githubConfirm === true ? "block;" : "none;"}">
      <h3 style = "display: inline;">Github: </h3>
      <a style = "display: inline;" href="${"https://www.github.com/" + github}">${github}</a>
    </div>
    <h3 style = "display: ${emailConfirm === true ? "block;" : "none;"}">${email}</h3>
</div>


<h3 style="position: absolute; top: 10px; right: 50px; border: solid 2px rgba(53, 138, 235); background-color: black; border-radius: 5px; align-self: center; margin: 3px; padding: 0 10px">${license}</h3>
`

inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Please enter the title of your project',
    },
    {
      type: 'input',
      name: 'desc',
      message: 'Please write a description',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What license is your project covered under?',
      choices: ['Public domain', "LGP", 'Permissive', 'Copyleft', 'Proprietary'],
    },
    {
      type: 'input',
      name: 'install',
      message: 'Please write your installation instructions',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Please include usage information',
    },
    {
      type: 'input',
      name: 'cont',
      message: 'Please include your contribution guidlines',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Please include tests instructions',
    },
    {
      type: 'confirm',
      name: 'githubConfirm',
      message: 'Would you like to provide your github username in your ReadMe?',
      default: false,
    },
    {
      type: 'input',
      name: 'github',
      message: 'Please enter your Github username',
      when: (answers) => answers.githubConfirm === true,
    },
    {
      type: 'confirm',
      name: 'emailConfirm',
      message: 'Would you like to provide your email in your ReadMe?',
      default: false,
    },
    {
      type: 'input',
      name: 'email',
      message: 'Please enter your email address',
      when: (answers) => answers.emailConfirm === true,
    },
  ])
  .then((answers) => {
    const readMeContent = generateReadMe(answers);

    fs.writeFile('README.md', readMeContent, (err) =>
      err ? console.log(err) : console.log('Your ReadMe generated successfully!')
    );
  });
