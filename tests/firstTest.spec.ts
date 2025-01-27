import {test} from '@playwright/test'

test('the first sequential test', ({page}) => {
    // this will fail because the return type Promise is async
    page.goto('http://localhost:4200/') 
})

test.describe('test suite one', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
    })

    // {page, browser} are test fixtures
    // use 'async' in test block when using 'await' in the code lines
    test('the first asynchronous test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({page}) => {
        await page.getByText('Datepicker').click()
    })

})