/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'
import { assert } from 'console'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'

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

test('parameterized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutPage = new FormLayoutsPage(page)
    await navigateTo.formLayoutsPage()
    await onFormLayoutPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
        'test@test.com',
        'Welcome1',
        'Option 2'
    )
    await onFormLayoutPage.submitInlineFormWithEmailEmailAndCheckbox(
        'John Smith',
        'john@test.com',
        true
    )
})