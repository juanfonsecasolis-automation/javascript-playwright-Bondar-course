/**
 * 2025 Juan Fonseca.
 * Playwright: Web Automation Testing From Zero to Hero course
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
    test('first asynchronous test', async ({page}) => {
        await page.locator(gridSubmitButtonLocator).click()
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