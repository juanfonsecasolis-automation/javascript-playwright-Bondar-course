/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datepickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
})

test('parameterized methods', async ({page}) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
        process.env.USERNAME as string,
        process.env.PASSWORD as string,
        'Option 2'
    )

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(1000)}@test.com`

    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    await pm.onFormLayoutPage().submitInlineFormWithEmailEmailAndCheckbox(
        randomFullName,
        randomEmail,
        true
    )

    // screenshot of just one part of the screen
    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/formsLayoutsPageLocator.png'})
})

test('parameterized datepicker', async ({page}) => {
    const numberOfDaysFromToday = 10

    // arrange
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)  // date must be in the future as we don't select prior months yet (see below)
    const expectedDay = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedYear = date.getFullYear()
    const calendarInputField = page.getByPlaceholder('Form Picker')

    // act
    const pm = new PageManager(page)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(numberOfDaysFromToday)

    // assert, verify the selected date is displayed after the datepicker component is closed
    const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}` // string interpolation
    await expect(calendarInputField).toHaveValue(expectedDate)
})

test('parameterized datepicker range', async ({page}) => {
    // TO DO: fix DatePickerPage.selectDateInTheCalendar so that is also picks value from the
    // range picker (whose class is a bit different: "class="range-cell day-cell bounding-month ng-star-inserted"").
    // Then, refactor the code to get the expected date as "startDate - endDate"    
    const numberOfDaysFromToday = 5

    // arrange
    let date = new Date()
    date.setDate(date.getDate() + numberOfDaysFromToday)  // date must be in the future as we don't select prior months yet (see below)
    const expectedDay = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedYear = date.getFullYear()
    const calendarInputField = page.getByPlaceholder('Form Picker')

    // act
    const pm = new PageManager(page)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(
        numberOfDaysFromToday, numberOfDaysFromToday+1)

    // assert, verify the selected date is displayed after the datepicker component is closed
    //const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}` // string interpolation
    //await expect(calendarInputField).toHaveValue(expectedDate)
})