/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test, expect} from '@playwright/test'
import { assert } from 'console'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test('Input fields', async ({page}, testInfo) => {

    if(testInfo.project.name == 'mobile')
    {
        await page.locator('.sidebar-toggle').click()    
    }
    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    if(testInfo.project.name == 'mobile')
    {
        await page.locator('.sidebar-toggle').click()    
    }

    const usingTheGridEmailInput = page
        .locator('nb-card', {hasText: "Using the Grid"})
        .getByRole('textbox', {name: "Email"});
    await usingTheGridEmailInput.fill('user1@domain.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('user2@domain.com')
})