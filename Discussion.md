# Is Javascript a suitable language for automation?

Copyright 2024-2025 Juan M. Fonseca-Solís.

## Problem
The use of automation frameworks based on Javascript (JS) and Typescript (TS) is becoming more and more popular, which is in partly due to the popularity of JS/Node.js in web development and the bias of authors to write the automation in the same language than the system under test.

## Objective
Determine if JS/TS/Playwright is a suitable tool-language combination for automating tests.

## State of the art
According to Zhan, maintainability is the key aspect when determining if an end-to-end automation framework is suitable for testing. Below is the criteria he provides for knowing if a combination of programming language, test tool, and test framework is a good choice [2]:

* i. **Scripting (interpreted) language.** Scripting languages provide a high-level syntax that lets to achieve more functionality with fewer lines of code (fewer lines of code facilitates maintainability and readability) [3, 9]. Besides, test automation is enterprise software, which means that it doesn't have to be implemented in the same language as the main application, making scripting languages an option [2, 8].
* ii. **Easy-to-understand syntax.** Some scripting languages make excessive and unnecessary use of code nesting, parentheses (brackets, rounded, square), lambda expressions, and synchronization keywords, which makes readability difficult. Automation should be easy to write also by team members with low code skills to help with the team productivity [2].
* iii. **Object-oriented programming language (OOPL).** OOPL is required to implement the Page Object Model (POM), a design pattern that separates tests from the page iteraction logic, facilitating the automation maintainability [2].
* iv. **Language is officially supported by the test tool.** Languages that are not officially supported by the framework will require hacks to work properly [2].

According to Zhan, Javascript (JS) satisfies conditions i and iv, but not ii and iii, and Python and Ruby are better choices; besides, TypeScript (TS), is a super set of Javascript and violates i (TS is compiled) and iii (TS still doesn't fully implement OOPL) [4, 5, 6, 7].

## Method
We created a minimal working example using JS/TS/Playwright and Artem Bondar's course (highest rated Playwright course on Udemy as of August 2025), then we compared Zhan's points to see if JS/TS/Playwright is still a good combination [1].

## Findings

### About Playwright...
The syntax is indeed different than Selenium, especially when combined with JS/TS . Overall, this framework is fast and makes automation easy by creating an extra layer of abstraction to interact with web components. Here are some examples:
* it provides methods to check/uncheck checkboxes, and you don't need to know in advance the previous status of the component,
* it provides methods to apply assertions directly to locators instead of web component properties,
* it let programmers find elements by a generic role using the GetByRole method (for instance, button or label) instead of using XPath,
* it let programmers navigate backwards in locators paths using "..".

One disadvantage is that creating test fixtures is tricky.

### Abouts JS/TS...
Using JS/TS wasn't that bad, but these languages have a steeper learning curve compared with C#, Java, or Python. Also, there are some annoyances compared with other languages: 
1. programmers need to type the keyword "await" all the times when they want to access a web component (it's tricky to know where you have to put them),
2. the use of async and the parenthesis nesting "({})" (sending an empty dictionary of parameters) adds overhead,
3. programmers have to export functions to make them visible in outside modules,
4. ES modules is an obscure topic,
5. programmers have to use the `export` keyword to use functions outside a file.

Some points in favor are:
1. the syntax of JS/TS is not that different than other languages, like Java,
1. you can call ReactJS test libraries natively,
1. you can define aliases for long commands in the package.json file,
1. you can use the describe-test syntax (preferred over Gherkin when implementing BDD), and 

Regarding the points mentioned by Zhan; yes, JS/TS still doesn't have an easy-to-understand syntax compared with Python/Ruby (point ii); but in practice you don't notice that TS isn't a fully Object-oriented programming language (point iv). We didn't find problems implementing inheritance, abstraction, and polymorphism (we aren't entering into purist discussions for the sake of practicity).

## Conclusions
If the size of the team is large, and the manual and automation testing roles are differentiated, then resources focused on automating tests will have enough time to master JS/TS and combine it with Playwright. We say so because JS/TS syntax is complex and the learning curve can be steep, for non-web developers. Also, in practice, we didn't notice the limitations of TS as a not-fully object-oriented programming language. Regarding Playwright, it seems a good alternative to Selenium as it provides an extra layer of abstraction that makes easier the interaction with web-components and assertions. Now, if the size of team is small and resources need to jump from one role into another our recommendation is using Playwright with a language with an easier syntax, like Python.

## References
1. Artem Bondar. Playwright: Web Automation Testing From Zero to Hero. Udemy. URL: https://www.udemy.com/course/playwright-from-zero-to-hero (last consulted on 12/6/24).
2. Zhimin Zhan. Why JavaScript Is Not a Suitable Language for Real Web Test Automation?. Medium. URL: https://medium.com/@zhiminzhan/why-javascript-is-not-a-suitable-language-for-real-web-test-automation-3a87eb4b0b50 (last consulted on 12/06/24).
3. Coursera. 5 Types of Programming Languages. URL: https://www.coursera.org/articles/types-programming-language (last consulted on 12/06/24). 
4. Vivasoft. Is JavaScript an Object Oriented Language. URL: https://vivasoftltd.com/is-javascript-an-object-oriented-language/ (last consulted on 12/06/24).
5. G. Purcaru et al. Is JavaScript object-oriented? Stack Overflow. URL: https://stackoverflow.com/questions/107464/is-javascript-object-oriented (last consulted on 12/06/240).
6. Zhimin Zhan. Why Ruby is the Best Scripting Language for End-to-End Test Automation? Medium. URL: https://zhiminzhan.medium.com/why-ruby-is-the-best-scripting-language-for-end-to-end-test-automation-d1b014d8cb8c (last consulted on 12/06/24)
7. Pragmatic Maciej. No, TypeScript is not OOP version of JavaScript. Dev, 2020. URL: https://dev.to/macsikora/no-typescript-is-not-oop-version-of-javascript-3ed4 (consulted on 12/06/).
8. Matthew Finio, Amanda Downie. What are enterprise applications? IBM, 8 May 2024. URL: https://www.ibm.com/topics/enterprise-applications (last consulted on 12/16/24).
9. Coursera. What Are Scripting Languages? (And Why Should I Learn One?). Nov 29, 2023. URL: https://www.coursera.org/articles/scripting-language (last consulted on 12/16/24).