/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect } from '@playwright/test'
import { assert } from 'console'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

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
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatepickerPage(page)
    await navigateTo.datepickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(numberOfDaysFromToday)

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
    const navigateTo = new NavigationPage(page)
    const onDatePickerPage = new DatepickerPage(page)
    await navigateTo.datepickerPage()
    await onDatePickerPage.selectDatePickerWithRangeFromToday(
        numberOfDaysFromToday, numberOfDaysFromToday+1)

    // assert, verify the selected date is displayed after the datepicker component is closed
    //const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}` // string interpolation
    //await expect(calendarInputField).toHaveValue(expectedDate)
})