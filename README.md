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

## Video
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

# Application under test (Angular)
```
git clone git@github.com:bondar-artem/pw-practice-app.git
npm install --force
npm start
open http://localhost:4200/
```

## Javascript review lessons
```
cd lessons
node lesson1.js
...
```

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

### Javascript / Typescript...
Using JS/TS was not that bad. Four points in favor are that (i) the syntax of JS/TS is not that different than other languages, like Java, (ii) you can call ReactJS native test libraries, (iii) you can use the describe-test syntax, and (iv) you can practically use inheritance, abstraction, and polymorphism (of course, I did not entered in theorical purist discussions). Two points against it is that (i) you need to type the keyword "await" all the times you want to access a web component (it's a like tricky where you have to put it), and (ii) the use of async and the parenthesis nesting "({})" is a complication. Some advantages are:

* you can use libraries created in JS to test, let's say, React.JS applications,
* you can define aliases for long commands in the package.json file.

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