# javascript-playwright
Copyright 2024 Juan M. Fonseca-Solís.

## Setup
1. Install "Playwright Test for VSCode".
1. Install Node.js LTS.
1. Run as sudo `npx playwright install`
1. Run `npm init playwright@latest`

## Run
```
npx playwright test firstTest.spec.ts --project=Chromium --headed --trace on
npx playwright show-report
npx playwright test --ui
```

## Debug
```
npx playwright test firstTest.spec.ts --project=Chromium --headed --trace on --debug
```

# Application under test (Angular)
```
git clone git@github.com:bondar-artem/pw-practice-app.git
npm install --force
npm start
open http://localhost:4200/
```

## Lessons
```
cd lessons
node lesson1.js
...
```

## Disclaimer
Maintainability is one important aspect of successful end-to-end automation solutions. It is determined, among other factors, by the programming language, test tool, and test framework selection. Below are some criteria suggested by authors to choose the right programming language [2].

1. **Scripting (interpreted) language.** Scripting languages are decoupled from the system architecture, meaning they can provide high-level instructions to achieve the same functionality as other languages by writing less lines of code [3, 9]. Fewer lines of code facilitate maintainability and readability. Also, test automation is enterprise software, meaning that it doesn't have to be implemented in the same language as the main application [2, 8].
2. **Easy-to-understand syntax.** This is not necessarily a consequence of the previous point. Some scripting languages make excessive and unnecessary use of code nesting, parenthesis (brackets, rounded, square), lambda expressions, and synchronization keywords; which makes readability difficult. Automation should be easy to write also by non-programming team members (for instance, starter manual testers) to help them ramp-up and alleviate the workload during high peaks [2].
3. **Object-oriented programming language (OOPL).** OOPL is required to implement the Page Object Model (POM), a design pattern that facilitates test maintainability by separating tests from pages. The layer that interacts with the system under test. For instance: web-page, mobile devices, and desktop [2].
4. **Language is officially supported by the test tool.** Languages that are not supported by the company behind the test tool (for instance, Selenium WebDriver or Playwright) require hacks to work properly [2].

Javascript (JS) satisfies conditions i and iv, but not ii and iii [4, 5]. TypeScript (TS), a super version of Javascript, is compiled (violating i) and is still not fully an OOPL [6, 7]. Python and Ruby are better choices according to the conditions mentioned. The work published in this repository will be focused on investigating automation with JS/TS to obtain a better understanding.

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
