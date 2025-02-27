/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {Locator, Page} from '@playwright/test'

export class DatepickerPage 
{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number)
    {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        await this.selectDateInTheCalendar(numberOfDaysFromToday)
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number)
    {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        await this.selectDateInTheCalendar(startDayFromToday)
        await this.selectDateInTheCalendar(endDayFromToday)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number)
    {
        // compute an expected date
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)  // date must be in the future as we don't select prior months yet (see below)
        const expectedDay = date.getDate().toString()

        // open the datepicker compnent
        const expectedYear = date.getFullYear()
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

        // change to the expected month using pagination
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        while(calendarMonthAndYear!=null && !calendarMonthAndYear.includes(expectedMonthAndYear))
        {
            await this.page.locator('nb-calendar-pageable-navigation').locator('//*[@data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        // click the selected date
        await this.page
            .locator('//*[@class="day-cell ng-star-inserted"] | //*[@class="today day-cell ng-star-inserted"]')
            .getByText(expectedDay, {exact: true}).click()
    }
}