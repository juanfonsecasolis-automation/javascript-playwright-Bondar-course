/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test, expect} from '@playwright/test'
import { assert } from 'console'
import {NavigationPage} from '../page-objects/navigationPage'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datepickerPage();
    await navigateTo.smartTablePage();
    await navigateTo.toastrPage();
    await navigateTo.tooltipPage();
})