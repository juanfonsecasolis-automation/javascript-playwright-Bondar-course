/**
 * 2025 Juan Fonseca.
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test} from '@playwright/test'

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

    // use 'async' in test block when using 'await' in the code lines
    test('Using the Grid test', async ({page}) => {
        await page.getByPlaceholder('Jane Doe').fill('John Doe')

        var gridCard = await page.locator('nb-card', {hasText: "Using the Grid"})
        await gridCard.getByLabel('Email').fill('username@domain.com')
        await gridCard.getByLabel('Password').nth(0).fill('password')   // try to avoid this approach (index can change on implementation)
        await gridCard.getByText("Option 1").check()
        await gridCard.locator(gridSubmitButtonLocator).click()
    })

    test('Using the Basic form', async ({page}) => {
        var basicForm = await page.locator("//nb-card-header[text()='Basic form']").locator('..')
        await basicForm.getByLabel('Email').fill('username@domain.com')
        await basicForm.getByLabel('Password').nth(0).fill('password')   // try to avoid this approach (index can change on implementation)
        await basicForm.getByText("Submit").click()
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