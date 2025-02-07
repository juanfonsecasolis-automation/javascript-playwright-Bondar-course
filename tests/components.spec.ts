/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test, expect} from '@playwright/test'
import { assert } from 'console'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({page}) => {
        const usingTheGridEmailInput = page
            .locator('nb-card', {hasText: "Using the Grid"})
            .getByRole('textbox', {name: "Email"});
        await usingTheGridEmailInput.fill('user1@domain.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('user2@domain.com', {delay: 500})  // simulate keys pressing
        
        // generic assestion
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect(inputValue).toEqual('user2@domain.com')

        // locator assertion
        expect(usingTheGridEmailInput).toHaveValue('user2@domain.com')  // toHaveText won't work
    })

    test('Radio buttons', async ({page}) => {

        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

        /**
         * <input _ngcontent-rxn-c225="" type="radio" class="native-input visually-hidden" name="undefined" value="undefined">
         * <span _ngcontent-rxn-c225="" class="text">Option 1</span>
        */
        await usingTheGridForm.getByLabel('Option 1').check({force: true})   // force because the radio button has class "visually hidden"
        const radioButton1 = usingTheGridForm.getByRole('radio', {name: 'Option 1'})
        await radioButton1.check({force: true})

        const radioStatus = await radioButton1.isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(radioButton1).toBeChecked()

        // verify that after user selects radio button 2 the radio button 1 is not checked
        const radioButton2 = usingTheGridForm.getByRole('radio', {name: 'Option 2'})
        await radioButton2.check({force: true})
        expect(await radioButton1.isChecked()).toBeFalsy()
        expect(await radioButton2.isChecked()).toBeTruthy()
    })

    test('Checkboxes', async ({page}) => {

        /**
         * <input _ngcontent-rxn-c155="" type="checkbox" class="native-input visually-hidden">
         * <span _ngcontent-rxn-c155="" class="text">Hide on click</span>
        */

        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})

        // check/uncheck all check boxes
        const allBoxes = page.getByRole('checkbox')
        for(const box of await allBoxes.all())
        {
            await box.check({force: true})
            expect(await box.isChecked).toBeTruthy()
        }
    })

    test('Dropdown test', async ({page}) => {
        const dropDownMenu = page.locator('ngx-header nb-select')
        await dropDownMenu.click()

        /** # Use of list and listitem
         * 
         * <ul class="option-list"><nb-option _ngcontent-rxn-c261=""...
         * <nb-option _ngcontent-rxn-c261="" _nghost-rxn-c211=""...
         * await page.getByRole('list')    // use when the list has a ul tag
         * await page.getByRole('listitem')    // use when the list has li tag
        */

        const colors = {
            'Light': 'rgb(255, 255, 255)',
            'Dark': 'rgb(34, 43, 69)',
            'Cosmic': 'rgb(50, 50, 89)',
            'Corporate': 'rgb(255, 255, 255)'
        }
        const optionList1 = page.getByRole('list').locator('nb-option')
        await expect(optionList1).toHaveText(Object.keys(colors))
        await optionList1.filter({hasText:'Cosmic'}).click()

        // verify that the background color changed to the desired value
        const header = page.locator('nb-layout-header')
        await expect(header).toHaveCSS('background-color', colors['Cosmic'])

        // verify every color from the list
        for(const color in colors)
        {
            await dropDownMenu.click()
            await optionList1.filter({hasText: color}).click()
            await expect(header).toHaveCSS('background-color', colors[color])
        }
    })

})
