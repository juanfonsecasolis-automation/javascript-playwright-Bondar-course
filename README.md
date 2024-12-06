# javascript-playwright
Copyright 2024 Juan M. Fonseca-Solís.

## Setup

## Run

## Disclaimer
Good programming language choices for end-to-end test automation seem to satisfy the following conditions: (i) be an scripting language, to do more with less lines of code and support larger applications (as in enterprise software vs. system software), (ii) have an easy-to-understand syntax, to let non-developers team members participate in the automation process (think on manual testers without a programming background), (iii) be an object-oriented programming language (OOPL), to implement Page Object Model (POM) and facilitate maintenability of the project, and (iv) be compatible with Selenium WebDriver (a long-standing test tool well adapted to the industry) [2]. Javascript (JS) satisfies conditions i and iv, but not ii and iii, as it overuses code nesting (code inside brackets), await-asyncs, and it is not a fully OOPL [4, 5]. TypeScript (TS), a super version of Javascript, is compiled (violating i) and still not fully an OOPL [6, 7]. Python and Ruby are better choices according to the conditions mentioned, but I still plan to investigate automation with JS/TS to obtain a better understanding.

## References
1. Artem Bondar. Playwright: Web Automation Testing From Zero to Hero. Udemy. URL: https://www.udemy.com/course/playwright-from-zero-to-hero (last consulted on 12/6/24).
2. Zhimin Zhan. Why JavaScript Is Not a Suitable Language for Real Web Test Automation?. Medium. URL: https://medium.com/@zhiminzhan/why-javascript-is-not-a-suitable-language-for-real-web-test-automation-3a87eb4b0b50 (last consulted on 12/06/24).
3. Coursera. 5 Types of Programming Languages. URL: https://www.coursera.org/articles/types-programming-language (last consulted on 12/06/24).
4. Vivasoft. Is JavaScript an Object Oriented Language. URL: https://vivasoftltd.com/is-javascript-an-object-oriented-language/ (last consulted on 12/06/24).
5. G. Purcaru et al. Is JavaScript object-oriented? Stack Overflow. URL: https://stackoverflow.com/questions/107464/is-javascript-object-oriented (last consutled on 12/06/240).
6. Zhimin Zhan. Why Ruby is the Best Scripting Language for End-to-End Test Automation? Medium. URL: https://zhiminzhan.medium.com/why-ruby-is-the-best-scripting-language-for-end-to-end-test-automation-d1b014d8cb8c (consulted on 12/06/24)
7. Pragmatic Maciej. No, TypeScript is not OOP version of JavaScript. Dev, 2020. URL: https://dev.to/macsikora/no-typescript-is-not-oop-version-of-javascript-3ed4 (consulted on 12/06/). 
