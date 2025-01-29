/**
 * 2025 Juan Fonseca.
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 * 
 * Note: Be sure to run the sample app `npm start` on git@github.com:bondar-artem/pw-practice-app.git
 * before executing the tests.
 */

import {test, expect} from '@playwright/test'
import exp from 'constants'

// this applies to all test suites below
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
})

test.describe('Forms test suite', () => {

    var gridSubmitButtonLocator = "//*[text()='Using the Grid']/following-sibling::*//button"

    test.beforeEach(async ({page}) => {
        await page.getByText('Form Layouts').click()
    })

    // {page, browser} are test fixtures
    test('first sequential test', ({page}) => {
        // this will fail because the return type Promise is async
        page.locator(gridSubmitButtonLocator).click()
    })

    test('always failing test', async ({page}) => {
        expect(page.getByPlaceholder('Jane Doe').count()).toBeGreaterThanOrEqual(2)
    })

    // use 'async' in test block when using 'await' in the code lines
    test('Using the Grid test', async ({page}) => {
        await page.getByPlaceholder('Jane Doe').fill('John Doe')

        const gridCard = await page.locator('nb-card', {hasText: "Using the Grid"})
        await gridCard.getByLabel('Email').fill('username@domain.com')
        await gridCard.getByLabel('Password').nth(0).fill('password')   // try to avoid this approach (index can change on implementation)
        await gridCard.getByText("Option 1").check()
        await gridCard.locator(gridSubmitButtonLocator).click()
    })

    test('Using the Basic form', async ({page}) => {
        const basicForm = page.locator("//nb-card-header[text()='Basic form']").locator('..')
        await basicForm.getByLabel('Email').fill('username@domain.com')
        await basicForm.getByLabel('Password').nth(0).fill('password')   // try to avoid this approach (index can change on implementation)
        await basicForm.getByText("Submit").click()
    })

    test('Extracting values', async ({page}) => {
        
        // single text value
        const basicForm = page.locator("nb-card").filter({hasText: "Basic form"})
        const buttonText = await basicForm.locator("button").textContent()
        expect(buttonText).toEqual("Submit")

        // all text values
        const allRadioButtonsLabels = await page.locator("nb-radio").allTextContents()
        expect(allRadioButtonsLabels).toContain("Option 1")

        // input value
        const expectedEmailValue = "user@domain.ext"
        const emailField = basicForm.getByRole('textbox', {name: "Email"})
        await emailField.fill(expectedEmailValue)
        const emailValue = await emailField.inputValue()  // ask not for the text because the content is stored in an attribute
        expect(emailValue).toEqual(expectedEmailValue)
        
        const placeholderValue = await emailField.getAttribute("placeholder")
        expect(placeholderValue).toEqual("Email")
    })

    test('Assertions', async ({page}) => {

        // Type 1: GenericAssertions
        expect(5).toEqual(5)

        // use await when interacting with locators
        const basicFormButton = page.locator("nb-card").filter({hasText: "Basic form"}).locator('button')
        const textContent = await basicFormButton.textContent();
        expect(textContent).toEqual('Submit')

        // Type 2: LocatorAssertions (automatically searches for the text in the locator, waiting 5s)
        await expect(basicFormButton).toHaveText("Submit")

        // Type 3: SoftAssertions. Continues next lines even after the assertion failed,
        // but this is not a good practice.
        await expect.soft(basicFormButton).toHaveText("Submit5")    // should fail
        await basicFormButton.click()
    })

    test.afterEach(async ({page}) => {
        // do nothing...
    })
})

test.describe('Datepicker test suite', () => {

    test('navigate to datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })

})