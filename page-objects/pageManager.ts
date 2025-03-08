/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {Locator, Page} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager 
{
    private readonly page: Page
    private readonly navigationPage:NavigationPage
    private readonly formLayoutPage:FormLayoutsPage
    private readonly datePickerPage:DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatepickerPage(this.page)
    }

    navigateTo()
    {
        return this.navigationPage
    }

    onFormLayoutPage()
    {
        return this.formLayoutPage
    }

    onDatePickerPage()
    {
        return this.datePickerPage
    }
}