/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test } from '../test-options'
import { faker } from '@faker-js/faker'

/**
 * Test fixtures component already go to the baseURL page and navigate to the form layout page.
 * Because in test-options.ts we made formLayoutsPage and array containing "{auto: true}" we
 * didn't have to specify the "formLayoutsPage" function as an argument in the function below
 * (see lesson 69. Fixtures at minute 7:30).
 */
//test('parameterized methods', async ({page, formLayoutsPage}) => {
test('parameterized methods', async ({pageManager}) => {

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replaceAll(' ','')}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(
        process.env.USERNAME as string,
        process.env.PASSWORD as string,
        'Option 2'
    )
    await pageManager.onFormLayoutPage().submitInlineFormWithEmailEmailAndCheckbox(
        randomFullName,
        randomEmail,
        true
    )
})