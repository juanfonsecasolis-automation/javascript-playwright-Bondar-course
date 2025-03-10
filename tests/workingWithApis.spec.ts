/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'; // external import
//import tags from '../test-data/tags.json' with { type: "json" }; // local import

test.beforeEach(async ({page}) => {

    // configure the mock
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

    // navigate to the main website
    await page.goto('https://conduit.bondaracademy.com/')
})

test('has title', async ({page}) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
})