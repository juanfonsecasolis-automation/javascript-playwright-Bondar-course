/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'; // external import
//import tags from '../test-data/tags.json' with { type: "json" }; // local import

test.beforeEach(async ({page}) => {

    // configure the mock for tags
    await page.route('*/**/api/tags', async route => {
        
        const tags = { 
            "tags": [
                "automation",
                "playwright"
            ]
        }

        await route.fulfill({
            body: JSON.stringify(tags)
        }) 
    })

    // configure the mock for tags
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch() // complete the API call and return the response
        const responseBody = await response.json()
        responseBody['articles'][0].title = 'This is a test title.'
        responseBody['articles'][0].description = 'This is a test description.'
        await route.fulfill({
            body: JSON.stringify(responseBody)
        }) 
    })

    // navigate to the main website
    await page.goto('https://conduit.bondaracademy.com/')
})

test('has title', async ({page}) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').first()).toContainText('This is a test title.')
    await expect(page.locator('app-article-list p').first()).toContainText('This is a test description.')
})