import { test as base } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

/**
 * Test fixtures
 * 
 * Use this file when you want to use other environment variables 
 * different than baseURL in playwright.config.ts
 */
export type TestOptions = 
{
    customEnvironmentVariable: string
    formLayoutsPage: string
    pageManager
}

// inherits from the test class of Playwright
export const test = base.extend<TestOptions>({

    customEnvironmentVariable: ['', {option: true}],

    /**
     * Option 1. Independent fixtures.
     */
    // 'use' is a method send as parameter in the anonymous function defined below
    /*formLayoutsPage: [
        async({page}, use) => {
            await page.goto('/')
            await page.getByText('Forms').click()
            await page.getByText('Form Layouts').click()
            await use('')
        }, 
        {auto: true}
    ],

    // pageManager: async({page}, use) => {
    pageManager: async({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }*/

    /**
     * Option 2. One fixture depends on another.
     */
    formLayoutsPage: async({page}, use) => {
        // test precondition or setup
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        // test post conditions or teardown (executed after "use('')", as yield in Python)
        // ...
    },

    // here formLayoutPage is a precondition for the formLayoutsPage used 
    // in testWithFixtures.spec.ts
    pageManager: async({page, formLayoutsPage}, use) => {
        // test precondition or setup
        const pm = new PageManager(page)
        await use(pm)
        // test post conditions or teardown
        // ...
    }
})