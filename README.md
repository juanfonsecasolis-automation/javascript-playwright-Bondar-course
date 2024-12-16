# javascript-playwright
Copyright 2024 Juan M. Fonseca-Solís.

## Setup

## Run

## Disclaimer
Maintenability is one important aspect on successful end-to-end automation solutions. It is determined, among other factors, by the chosen programming language, test tool, and test framework. Given this is a repository containing a JavaScript (JS) test solution, I would like to refer to the language (Playwright seems a good choice as Selenium). Below are some criterias suggested by authors to choose the right programming language [2].

1. **Scripting (interpreted) language.** Scripting languages are decoupled from the system architecture, meaning they can provide high-level instructions to achieve the same functionality than other languages but writting less lines of code [3, 9]. Fewer lines of code facilitates maintenability and readability. Also, test automation is enterprise software, meaning that it doesn't have to be implemented in the same language that the main application because its purpose is to serve business to perform testing [2, 8].
2. **Easy-to-understand syntax.** This is should be a consequence of the previous point, but it is not. Some scripting languages make excesive and unnecesary use of code nesting, parenthesis (brackets, rounded, square), lambda expressions, and synchronization keywords; which difficults readability. Automation should be easy to write also by non-programming team members (for instance, starter manual testers) [2].
3. **Object-oriented programming language (OOPL).** OOPL is required to implement Page Object Model (POM), a design pattern that facilitates test maintenability by separating tests from pages (the system-under-test, for instance: web-page, mobile device, desktop) [2].
4. **Language officially supported by the test tool.** Languages that are not supported by the company behind the test tool (for instance, Selenium WebDriver or Playwright) will require hacks to work properly [2].

JS satisfies conditions i and iv, but not ii and iii [4, 5]. TypeScript (TS), a super version of Javascript, is compiled (violating i) and is still not fully an OOPL [6, 7]. Python and Ruby are better choices according to the conditions mentioned, but I still plan to investigate automation with JS/TS to obtain a better understanding.

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
