# javascript-playwright
Copyright 2024-2025 Juan M. Fonseca-Solís.

[![Playwright Tests](https://github.com/juanfonsecasolis-automation/javascript-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/juanfonsecasolis-automation/javascript-playwright/actions/workflows/playwright.yml)

Solution for exercises of the course "Playwright: Web Automation Testing From Zero to Hero." of Artem Bondar [1].

## Setup
1. Install "Playwright Test for VSCode".
1. Install Node.js LTS (if installed, version can be known typing `node -v`).
1. Run as sudo `npx playwright install`.
1. Run `npm init playwright@latest`.
1. Run `npm install --save dotnet`.

## Run
```
npx playwright test firstTest.spec.ts --project=Chromium --headed --trace on
npx playwright show-report
npx playwright test --ui
npx playwright test --config=playwright-prod.config.ts
```

One can define custom commands on the package.json file and run them using `npm run <customCommand>`, for instance:
```
"scripts": {
    "pageObjects-chrome": "npx playwright test usePageObjects.spec.ts --project=Chromium"
}
```

## Using the Faker library
```
npm i @faker-js/faker --save-dev --force
```

## Debugging
```
npx playwright test firstTest.spec.ts --project=Chromium --headed --trace on --debug
```

Another way to debug is to generate "traces", a bundle of information for debugging containing
images ordered in sequential order and network information. To enable traces we modify the property `use.trace` in file playwright.config.ts by setting `trace: 'on-first-retry'` to 
`trace: 'on'`. The traces are attached to the botton of each failed test case on the Playwright report.

## Retries
* By default (retry is OFF), Playwright retries the failed test cases alone in a new browser sesions, when retry is ON, Playwright retries the failed test cases along the passed test cases in a new browser session. The retry flag can be configured in the playwright.config.ts file (retries node): change `retries: process.env.CI ? 2 : 0` to `retries: process.env.CI ? 2 : 1` or `retries: 1,`. 

Alternatively, retry can be configured just for one test suite:
```
test.describe('Form Layouts page', () => {
    test.describe.configure({retries: 2})
    
    test('test1', async({page}), testInfo => {
        if(testInfo.retry)
        {
            // clean database (anything that you want to use on each retry)
        }
    })

})
```

## Paralelism
Worker means a new instance of the web browser, and by default, Playwright runs spec files in parallel (one new worker per spec file). At playwright.config.ts file, `fullyParallel: true` determines if tests can be run in parallel inside each spec file (otherwise they run sequentially), and `workers: process.env.CI ? 1 : undefined` determines the number of spec files that run in parallel (apparently, no more than five, why?). One can order the number of execution of spec files by adding a prefix (e.g. 001-*). One can also control if a single spec file can run its tests in parallel:

```
import { test, expect } from '@playwright/test'

test.describe.configure({mode: 'parallel'})
```

It is not a good practice to make tests execute in certain order, but that can be achieved by adding `test.describe.configure({mode: 'serial'})` to the test suite.

## Video recording
Enabled on "use" tag at playwright.config.ts (by default 100x100 pixels) and run the tests via CLI:
```
video: 
{
    mode: 'on',
    size: {width:1920, height:1080}
}
```
The video will be saved on the test-results folder and attached automatically to the report.

## Skip test cases
```
test.skip('test1', async(test{page}), testInfo => {
    ...
```

## Fixtures
Are like the Before/After test hooks but more powerful to setup our test environment in advance.

## Tags
Use as follows: `npx playwright test --project=chromium --grep smoke`. Tags are defines at test case or test suite as below:
```
test('navigate to form page @smoke @regression', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    ...

test.describe('Form Layouts page @smoke', () => {
    ...
```

Multiple tags can be used by specifying the pipe symbol, as follows: `npx playwright test --project=chromium --grep @smoke|@regression` (Linux) or `npx playwright test --project=chromium --grep --% @smoke^|@regression^` (Windows).

## Allure
Installation on Linux:
```
sudo apt-get install default-jre-headless
sudo apt-get install allure
npm i -D @playwright/test allure-playwright --force
wget https://github.com/allure-framework/allure2/releases/download/2.33.0/allure_2.33.0-1_all.deb
sudo dpkg -i allure_2.33.0-1_all.deb 
```

To generate the HTML report (run the test project first):
```
allure generate allure-results -o allure-results --clean
```

## Generate screenshots
For image-to-image assertions (like Sikuli in Selenium):
```
npx playwright test --update-snapshots
```
Ground-of-truth images are created inside the test folder, under a folder with the name of the file where the "toHaveScreenshot" method is invoked. Example:
```
npx playwright test --project=chromium --grep snapshot
```

Differences in snapshots can be later seen in the test report: 
![](/img/snapshots.png)

# Application under test (Angular)
```
cd pw-practice-app # otherwise, clone it from git@github.com:bondar-artem/pw-practice-app.git
npm install --force
npm start
open http://localhost:4200/
```

## Docker
Building a docker image and running the tests in a container: 
1. Install Docker Engine using the steps described on [11].
1. Install Docker Desktop using the steps described on [12].
1. Start Docker Desktop `docker desktop start` to monitor the containers.
1. Build your personal "pw-pageobject-test" image `docker build -t pw-pageobject-test .` (remember to comment globalSetup and globalTeardown until we find a way to send email/password securily).
1. Run the image in a container in interacting mode: `docker run -it pw-pageobject-test`.
1. Run the test project typing `npm run pageObjects-chrome` or `npx playwright test --project=pageObjectFullScreen`.

To access the test report we need to copy it to the host machine running something called docker-compose (a way to orchestrate/control container creation, command execution, and return values):
```
sudo apt-get install docker-compose
docker-compose up --build
```


## Javascript review lessons
```
cd lessons
node lesson1.js
...
```

## Troubleshootle
When using `import user from '<jsonPath>' assert { type: "json" }` error 'ReferenceError: require is not defined in ES module scope' might appear, to bypass it set in the package.json `type: 'commonjs'` [10].

## Theory

### Page Object Model (POM)
"Is a design pattern used in test automation to organize source code, improve maintenability, and reusability of the code. Every page of the application has its own class with methods responsible for operations on this page." - A. Bondar

POM is based on the _Don't repeat yourself_ (DRY) and _Keep it simple stupid_ (KISS) principles; and it is a good companion for _descriptive naming_, which is naming members in a meaninful way, and _avoid tiny methods_, which is creating methods for code blocks instead of single statements, which overcomplicates the development.

### Automation maintenability
Maintainability is one important aspect of successful end-to-end automation solutions. It is determined, among other factors, by the programming language, test tool, and test framework selection. Below are some criteria suggested by authors to choose the right programming language [2].

1. **Scripting (interpreted) language.** Scripting languages are decoupled from the system architecture, meaning they can provide high-level instructions to achieve the same functionality as other languages by writing less lines of code [3, 9]. Fewer lines of code facilitate maintainability and readability. Also, test automation is enterprise software, meaning that it doesn't have to be implemented in the same language as the main application [2, 8].
2. **Easy-to-understand syntax.** This is not necessarily a consequence of the previous point. Some scripting languages make excessive and unnecessary use of code nesting, parenthesis (brackets, rounded, square), lambda expressions, and synchronization keywords; which makes readability difficult. Automation should be easy to write also by non-programming team members (for instance, starter manual testers) to help them ramp-up and alleviate the workload during high peaks [2].
3. **Object-oriented programming language (OOPL).** OOPL is required to implement the Page Object Model (POM), a design pattern that facilitates test maintainability by separating tests from pages. The layer that interacts with the system under test. For instance: web-page, mobile devices, and desktop [2].
4. **Language is officially supported by the test tool.** Languages that are not supported by the company behind the test tool (for instance, Selenium WebDriver or Playwright) require hacks to work properly [2].

## Investigation problem
According to Zhimin Zhan, Javascript (JS) satisfies conditions i and iv, but not ii and iii, and Python and Ruby are better choices; besides, TypeScript (TS), a super version of Javascript, which violates i (TS is compiled) and is still not fully an OOPL [4, 5, 6, 7].

## Objective
The objective of this repository is to put hands on automation using JS/TS with Playwright and determine if it is still a suitable combination.

## Method
The method followed was taking the course of Artem Bondar "Playwright: Web Automation Testing From Zero to Hero" and solve the exercises proposed.

## Conclusions

### Playwright
The syntax is a bit different than Selenium, specially if convined with JS/TS (where parameters are sent as dictionaries). Overall, this framework is fast, and makes automation easier by creating an extra layer of abstraction to interact with web components, here are some examples:
* you have a method to check/uncheck checkboxes and you don't need to know in advance the previous status of the component,
* you have methods to apply assertions directly to locators instead of web component properties,
* you can find elements by a generic role using the GetByRole method (e.g. button, label) instead of using XPath,
* you can navigate backwards in locators using "..".

As disadvantages, creating test fixtures is tricky.

### Javascript / Typescript...
Using JS/TS was not that bad, but it has a steeper learning curve compared with C#, Java, or Python; also it is not recommended for people with no previous background in programming. In particular: 
1. you need to type the keyword "await" all the times you want to access a web component (it's a like tricky to know where you have to put it),
2. the use of async and the parenthesis nesting "({})" is unusual (sending a dictionary of parameters),
3. you need to export functions to be visible in outside modules,
4. you need to develop knowledge in terms like the ES modules,
5. you need to use the `export` keyword to use functions outside a file.

Some points in favor are:
1. the syntax of JS/TS is not that different than other languages, like Java,
1. you can call ReactJS native test libraries,
1. you can define aliases for long commands in the package.json file,
1. you can use the describe-test syntax, and 
1. you can practically use inheritance, abstraction, and polymorphism (of course, I did not entered in theorical purist discussions).

## References
1. Artem Bondar. Playwright: Web Automation Testing From Zero to Hero. Udemy. URL: https://www.udemy.com/course/playwright-from-zero-to-hero (last consulted on 12/6/24).
2. Zhimin Zhan. Why JavaScript Is Not a Suitable Language for Real Web Test Automation?. Medium. URL: https://medium.com/@zhiminzhan/why-javascript-is-not-a-suitable-language-for-real-web-test-automation-3a87eb4b0b50 (last consulted on 12/06/24).
3. Coursera. 5 Types of Programming Languages. URL: https://www.coursera.org/articles/types-programming-language (last consulted on 12/06/24).
4. Vivasoft. Is JavaScript an Object Oriented Language. URL: https://vivasoftltd.com/is-javascript-an-object-oriented-language/ (last consulted on 12/06/24).
5. G. Purcaru et al. Is JavaScript object-oriented? Stack Overflow. URL: https://stackoverflow.com/questions/107464/is-javascript-object-oriented (last consutled on 12/06/240).
6. Zhimin Zhan. Why Ruby is the Best Scripting Language for End-to-End Test Automation? Medium. URL: https://zhiminzhan.medium.com/why-ruby-is-the-best-scripting-language-for-end-to-end-test-automation-d1b014d8cb8c (last consulted on 12/06/24)
7. Pragmatic Maciej. No, TypeScript is not OOP version of JavaScript. Dev, 2020. URL: https://dev.to/macsikora/no-typescript-is-not-oop-version-of-javascript-3ed4 (consulted on 12/06/). 
8. Matthew Finio, Amanda Downie. What are enterprise applications? IBM, 8 May 2024. URL: https://www.ibm.com/topics/enterprise-applications (last consulted on 12/16/24).
9. Coursera. What Are Scripting Languages? (And Why Should I Learn One?). Nov 29, 2023. URL: https://www.coursera.org/articles/scripting-language (last consulted on 12/16/24).
10. Alinton Gutierrez in reply to AskCoder. ReferenceError: require is not defined in ES module scope, you can use import instead gulp sass. StackOverflow. URL: https://stackoverflow.com/questions/69099763/referenceerror-require-is-not-defined-in-es-module-scope-you-can-use-import-in (last consulted on 07/04/25).
11. Docker. Install Docker Engine on Ubuntu. URL: https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository (last consulted on 14/04/25).
12. Docker. Install Docker Desktop on Ubuntu. URL: https://docs.docker.com/desktop/setup/install/linux/ubuntu/ (last consulted on 14/04/25).