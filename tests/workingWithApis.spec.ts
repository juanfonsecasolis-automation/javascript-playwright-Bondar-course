/**
 * 2025 Juan M. Fonseca-Solís
 * Playwright: Web Automation Testing From Zero to Hero course by Artem Bondar.
 */

import { test, expect, request } from '@playwright/test'; // external import

test.beforeEach(async ({page}) => {
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByText('Sign in').click()
    await page.getByRole('textbox', {name:"Email"}).fill("juantests@test.com")
    await page.getByRole('textbox', {name:"Password"}).fill("TestingSince2013!")
    await page.getByRole('button', {name:"Sign in"}).click()
})

test('create and delete an article', async ({page, request}) => {

    // log in
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {"email": "juantests@test.com", "password": "TestingSince2013!"}
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    // create the article
    const articleTitle = "Brand new article"
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article":{
                "title": articleTitle,
                "description":"Article created from a Playwright script.",
                "body":"This is a description.",
                "tagList":["Playwright", "Test"]}
        },
        headers: {
            Authorization: `Token ${accessToken}`
        }
    })
    expect(articleResponse.status()).toEqual(201)

    // delete the created article (not sure why Artem didn't use the delete POST request...)
    await page.getByText('Global Feed').click()
    await page.getByText(articleTitle).click()
    await page.getByRole('button', {name:"Delete Article"}).first().click()
    await expect(page.locator('app-article-list h1').first()).not.toContainText(articleTitle)
})