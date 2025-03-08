/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {Locator, Page} from '@playwright/test'

export class HelperBase 
{
    protected readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number)
    {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }


}