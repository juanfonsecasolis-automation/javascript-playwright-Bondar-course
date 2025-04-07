/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test, expect} from '@playwright/test'

test('Like counter increase', async({page}) => {
    page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Global Fee').click()

    const firstLikeButton = await page.locator('app-favorite-button').first()
    await expect(firstLikeButton).toHaveText('0')
    await firstLikeButton.click()
    await expect(firstLikeButton).toHaveText('1')
})