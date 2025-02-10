/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {Page} from '@playwright/test'

export class NavigationPage 
{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage()
    {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage()
    {

    }

    async smartTablePage()
    {

    }

    async toastPage()
    {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage()
    {

    }

}