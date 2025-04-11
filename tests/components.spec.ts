/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import {test, expect} from '@playwright/test'
import { assert } from 'console'

test.beforeEach(async ({page}) => {
    await page.goto('/')
})

test.describe('Form Layouts page @smoke', () => {

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

    test('Radio buttons asserted with snapshots', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});
        await usingTheGridForm.getByLabel('Option 1').check({force: true})   // force because the radio button has class "visually hidden"
        const radioButton1 = usingTheGridForm.getByRole('radio', {name: 'Option 1'})
        await radioButton1.check({force: true})

        const radioStatus = await radioButton1.isChecked()

        // this requires to run `npx playwright test --update-snapshots` (like Sikuli for Selenium)
        await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 150})
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

    test('tooltips', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()
        
        const tooltipCard = page.locator('nb-card', {hasText: "Tooltip Placements"});
        await tooltipCard.getByRole('button', {name: "Top"}).hover()
        
        //page.getByRole('tooltip')   // only works if you have a role tooltip created, not this case
        
        /**
         * Hint to get the locator for the tooltip:
         * a. Open the Developer Console.
         * b. Open the Sources tab.
         * c. Hover over the button to display the tooltip.
         * d. Press F8 to pause the execution (the tooltip box is frozen).
         * e. Inspect the element as you would do with other components.
         * f. Click the Resume button to dismiss.
         */
        const tooltipContent = await page.locator('nb-tooltip').textContent()
        await expect(tooltipContent).toEqual('This is a tooltip')
    })

    test('web tables exercises 1 and 2', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        // Exercise 1. Get a row locator for any text in that row.
        const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})  // this works because the email is a text in read-mode
        await targetRow.locator('.nb-edit').click()

        // Exercise 2. Change the age in the selected row, in this case
        // we can't search by text as before because the email is a property value.
        await page.locator('input-editor').getByPlaceholder("Age").clear()  // tag name != class name
        await page.locator('input-editor').getByPlaceholder("Age").fill("35")
        await page.locator('.nb-checkmark').click()
    })

    test('web tables exercise 3', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        // Exercise 3. Select a row searching a value in a specific column
        await page.locator('.ng2-smart-page-item').getByText('2').click()
        const targetRowById = page
            .getByRole('row', {name: '11'})
            .filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowById.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder("E-mail").clear()
        await page.locator('input-editor').getByPlaceholder("E-mail").fill("test@test.com")
        await page.locator('.nb-checkmark').click()
        await expect(targetRowById.locator('td').nth(5)).toHaveText("test@test.com")
    })

    test('web tables exercise 4', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        // Exercise 4. Filter values in the table
        const ageTestData = {
            '28': '28', 
            '30': '30', 
            '48': '48', 
            '200': ' No data found '
        } 

        for(let age of Object.keys(ageTestData))
        {
            await page.locator('input-filter').getByPlaceholder("Age").clear()
            await page.locator('input-filter').getByPlaceholder("Age").fill(age)
            await page.waitForTimeout(500)
            
            // check the value of the filtered rows
            const ageRows = page.locator('tbody tr')
            for(let row of await ageRows.all())
            {
                const cellValue = await row.locator('td').last().textContent()
                expect(cellValue).toEqual(ageTestData[age])
            }
        }
    })

    test('Datepickers', async ({page}) => {

        // get into the page
        await page.getByText('Forms').click()
        await page.getByText('Datepicker').click()

        // compute an expected date
        let date = new Date()
        date.setDate(date.getDate() + 100)  // date must be in the future as we don't select prior months yet (see below)
        const expectedDay = date.getDate().toString()

        // open the datepicker compnent
        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const expectedYear = date.getFullYear()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

        // change to the expected month using pagination
        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        while(calendarMonthAndYear!=null && !calendarMonthAndYear.includes(expectedMonthAndYear))
        {
            await page.locator('nb-calendar-pageable-navigation').locator('//*[@data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }

        // click the selected date
        await page
            .locator('//*[@class="day-cell ng-star-inserted"] | //*[@class="today day-cell ng-star-inserted"]')
            .getByText(expectedDay, {exact: true}).click()        

        // verify the selected date is displayed after the datepicker component is closed
        const expectedDate = `${expectedMonthShort} ${expectedDay}, ${expectedYear}` // string interpolation
        await expect(calendarInputField).toHaveValue(expectedDate)
    })
})

test.describe('Sliders', () => {

    test('update attribute', async ({page}) => {
        const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await tempGauge.evaluate(node => {  // evaluate a JS expression
            node.setAttribute('cx', '232.63')
            node.setAttribute('cy', '232.63')
        })  
        tempGauge.click()   // click to trigger an event and let the page update the slider
    })

    test('sliders mouse movement', async ({page}) => {
        const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()  // make sure the component is displayed in the page

        /**
         * When calling the "boundingBox" method Playwright creates a coordinate system 
         * for navigating the area of the component. The upper-left corner is coordinate (0, 0)
         * the horizontal axis is x and the vertical axis is y.
         * */
        const box = await tempBox.boundingBox()
        if(null != box)
        {
            // shift (0, 0) to the box center
            const x = box.x + box.width/2 
            const y = box.y + box.height/2
            await page.mouse.move(x, y) 
            await page.mouse.down() // simulates mouse click
            await page.mouse.move(x+100, y)
            await page.mouse.move(x+100, y+100)
            await page.mouse.up()   // releases mouse click
            await expect(tempBox).toContainText('30')
        }
    })

})
