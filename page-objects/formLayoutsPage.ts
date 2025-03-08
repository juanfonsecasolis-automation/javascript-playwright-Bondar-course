/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase';

export class FormLayoutsPage extends HelperBase
{
    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(
        email:string, password:string, optionText:string)
    {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"});
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * Fills the inline form with the name, email, and remember me checkbox
     * @param name - should be first and last name
     * @param email - follow the format name@domain.extension
     * @param rememberMe - true or false if session to be remembered
     */
    async submitInlineFormWithEmailEmailAndCheckbox(
        name:string, email:string, rememberMe:boolean)
    {
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"});
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        
        if(rememberMe)
        {
            await inlineForm.getByRole('checkbox').check({force: true})
        }
        await inlineForm.getByRole('button').click()
    }
}