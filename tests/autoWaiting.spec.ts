/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */


import {test, expect} from '@playwright/test'

// this applies to all test suites below
test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')

    // auto-wait before performing an action (https://playwright.dev/docs/actionability)
    // locator.click() waits for element to be visible, stable, no pending events, enabled
    await page.locator('button', {hasText:'Button Triggering AJAX Request'}).click()
})

test.describe('Waiting suite', () => {

    test('Autowait', async ({page}) => {
        // textContents() waits for the text to appear
        const message = await page.locator("//*[@class='bg-success']").textContent()
        expect(message).toContain("Data loaded with AJAX get request.")
    })

    test('Explicit wait', async ({page}) => {
        // allTextContents() does not wait for the text to appear, so we 
        // need to define an explicit wait
        await page.locator("//*[@class='bg-success']").waitFor({state:"attached"})
        const message = await page.locator("//*[@class='bg-success']").allTextContents()
        expect(message).toContain("Data loaded with AJAX get request.")
    })

    test('Wait for selector', async ({page}) => {
        await page.waitForSelector("//*[@class='bg-success']")
        const message = await page.locator("//*[@class='bg-success']").allTextContents()
        expect(message).toContain("Data loaded with AJAX get request.")
    })

    test('Wait for network call', async ({page}) => {
        await page.waitForResponse("http://uitestingplayground.com/ajaxdata")
        const message = await page.locator("//*[@class='bg-success']").allTextContents()
        expect(message).toContain("Data loaded with AJAX get request.")
    })

    test('Wait for all network calls (not recomended)', async ({page}) => {
        // If some network call is stuck all your tests will be stuck as well, 
        // that's why it is not recommended.
        await page.waitForLoadState("networkidle")
        const message = await page.locator("//*[@class='bg-success']").allTextContents()
        expect(message).toContain("Data loaded with AJAX get request.")
    })

})